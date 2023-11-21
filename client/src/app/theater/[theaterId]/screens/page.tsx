"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Grid, Typography, Button, Modal, Backdrop, Fade, Stack, TextField, FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import { getDataFromEndPoint } from "@/src/lib/backend-api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

interface Screen {
    id: string,
    name: string,
    timings: string[],
    maxCapacity: string,
    imageUrl: string,
    format: string,
    currentMovie: string,
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const schema = zod.object({
    movie: zod.string().min(1, 'Movie is required'),
    ticketPrice: zod.number().min(1, 'ticket price is required')
});

export default function Screen() {
    const router = useRouter();
    const { theaterId } = useParams();
    const [screenData, setScreenData] = useState<Screen[]>([]);
    const [open, setOpen] = React.useState<boolean>(false);
    const [movieData, setMovieData] = useState<any[]>([]);
    const handleClose = () => setOpen(false);

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        const fetchScreenData = async () => {
            const response = await getDataFromEndPoint("", 'screen/all', 'GET');
            const data = response.data;
            const mappedData: Screen[] = data.map((screenItem: any) => ({
                id: screenItem.screen_id,
                name: screenItem.screen_name,
                timings: screenItem.show_times,
                maxCapacity: screenItem.seating_capacity,
                imageUrl: screenItem.image_url,
                format: screenItem.screen_type,
                currentMovie: screenItem.currentMovie,
            }));
            setScreenData(mappedData);
        };

        const fetchMovieData = async () => {
            const response = await getDataFromEndPoint("", 'movie/all', 'GET');
            const data = response.movies;
            const mappedData = data.map((movie: any) => ({
                id: movie.id,
                name: movie.title,
            }));
            console.log(mappedData);
            setMovieData(mappedData);
        };

        fetchScreenData();
        fetchMovieData();
    }, []);

    const getErrorMessage = (error: any) => {
        return error && typeof error.message === 'string' ? error.message : '';
    };

    const addNewScreen = () => {
        router.push("/theater/" + theaterId + "/addScreen");
    }

    async function onSubmit(data: any) {
        data['theater_id'] = theaterId;
        const formUrl = 'screen/addMovie';
        try {
            await getDataFromEndPoint(data, formUrl, 'POST');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid container sx={{ mb: 2, marginTop: 10, justifyContent: 'space-between' }}>
                        <Typography variant="h4">Screens</Typography>
                        <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={addNewScreen}>
                            Add Screen
                        </Button>
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid container spacing={2} alignItems="center" justifyContent="left">
                            {screenData.map((screen, index) => (
                                <Grid item xs={12} md={6} lg={6} key={index}>
                                    <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
                                        <img src={screen.imageUrl} alt="screeb" style={{ marginBottom: 16, marginRight: 24, width: 192, borderRadius: 8 }} />
                                        <Box sx={{ flex: 1 }}>
                                            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                                <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 'medium', fontSize: '2rem' }} style={{}} color="#01579B">{screen.name}</Typography>
                                                <Box>
                                                    <Button startIcon={<EditIcon />} sx={{ px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }} />
                                                    <Button sx={{ px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }} onClick={() => setOpen(!open)}>
                                                        Add Movie
                                                    </Button>
                                                </Box>
                                            </Grid>
                                            <Box sx={{ px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }}>
                                                {`Current Movie: `}{screen.currentMovie}
                                            </Box>
                                            <Box sx={{ bgcolor: 'blue.100', color: 'blue.800', px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }}>{`Maximum Capacity: `}{screen.maxCapacity}</Box>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
                                                <Box sx={{ bgcolor: 'blue.100', color: 'blue.800', px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }}>{`Timings:`}</Box>
                                                {screen.timings.map((time, screenIndex) => (
                                                    <Button key={screenIndex} sx={{ px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }}>{time}</Button>
                                                ))}
                                            </Box>
                                            {/* {screen.currentMovie != null &&  */}
                                                <Button variant="contained">
                                                    Book Ticket
                                                </Button>
                                            {/* } */}
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={{
                        ...style, // Your existing styles
                        display: 'flex', // Ensures flexbox layout
                        justifyContent: 'center', // Centers horizontally
                        alignItems: 'center', // Centers vertically
                        // Full width of the parent
                        width: '600px',
                        maxWidth: '1000px'
                    }} >
                        <Stack direction="column" spacing={2} sx={{ width: '100%', maxWidth: '900px' }} >
                            <form action='/screen/addMovie' onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} md={12} lg={6}>
                                        <Controller
                                            name="movie"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <FormControl fullWidth margin="normal" error={!!errors.format}>
                                                    <InputLabel>Add Movie</InputLabel>
                                                    <Select {...field} label="Add Movie">
                                                        {movieData.map((movie) => (
                                                            <MenuItem key={movie.id} value={movie.id}>{movie.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    <FormHelperText id="component-error-text">{getErrorMessage(errors.format)}</FormHelperText>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={6}>
                                        <Controller
                                            name="ticketPrice"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) =>
                                                <TextField
                                                    {...field}
                                                    InputProps={{ inputProps: { min: 5, max: 10 } }}
                                                    type="number"
                                                    label="Ticket Price"
                                                    error={!!errors.ticketPrice}
                                                    helperText={getErrorMessage(errors.ticketPrice)}
                                                    fullWidth
                                                    margin="normal" />}
                                        />
                                    </Grid>
                                </Grid>
                                <Button variant="contained" endIcon={<SendIcon />} type="submit">
                                    Add Movie
                                </Button>
                            </form>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </React.Fragment >
    )
}