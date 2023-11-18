"use client"
import React from "react";
import { useRouter } from "next/navigation";

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Grid, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const screenData = [
    {
        id: 1,
        name: 'Screen 1',
        timings: ['9:30 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
        maxCapacity: 200,
        currentMovie: 'The Big Adventure',
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        format: '3D',
    },
    {
        id: 2,
        name: 'Screen 1',
        timings: ['9:30 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
        maxCapacity: 200,
        currentMovie: 'The Big Adventure',
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        format: '3D',
    },
    {
        id: 3,
        name: 'Screen 1',
        timings: ['9:30 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
        maxCapacity: 200,
        currentMovie: 'The Big Adventure',
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        format: '3D',
    },
    {
        id: 4,
        name: 'Screen 1',
        timings: ['9:30 AM', '7:00 PM'],
        maxCapacity: 200,
        currentMovie: 'The Big Adventure',
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        format: '3D',
    },
];

const schema = zod.object({
    screenName: zod.string().min(1, 'Screen Name is required'),
    timing: zod.array(zod.string()).min(1, 'Select at least one timing'),
    format: zod.string().min(1, 'Format is required'),
    rows: zod.number().min(10).max(20),
    columns: zod.number().min(10).max(20)
});

export default function Screen() {
    const router = useRouter();
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        overflow:'scroll',
        boxShadow: 24,
        p: 4,
    };

    const addNewScreen = () => {
        router.push("/theater/1/addScreen");
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" style={{ marginLeft: "0px", marginRight: "0px", marginTop: "3%" }}>
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
                                                </Box>
                                            </Grid>
                                            <Box sx={{ bgcolor: 'blue.100', color: 'blue.800', px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }}>{`Current Movie: `}{screen.currentMovie}</Box>
                                            <Box sx={{ bgcolor: 'blue.100', color: 'blue.800', px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }}>{`Maximum Capacity: `}{screen.maxCapacity}</Box>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
                                                <Box sx={{ bgcolor: 'blue.100', color: 'blue.800', px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }}>{`Timings:`}</Box>
                                                {screen.timings.map((time, screenIndex) => (
                                                    <Button key={screenIndex} sx={{ px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }}>{time}</Button>
                                                ))}
                                            </Box>
                                            <Button variant="contained">
                                                Book Ticket
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment >
    )
}