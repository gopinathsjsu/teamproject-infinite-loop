"use client"
import { getDataFromEndPoint } from "@/src/lib/backend-api";
import Alert from '@mui/joy/Alert';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Grid, Typography, Button, Link, Stack, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Fade from '@mui/material/Fade';
import Avatar from '@mui/material/Avatar';
import Add from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import SendIcon from '@mui/icons-material/Send';
import Chip from '@mui/material/Chip';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export interface theater {
    name: string,
    description: string,
    locationUrl: string,
    address: string,
    screenDetails: string[],
    imageUrl: string,
    nScreens: number,
    email: string,
    phoneNumber: string,
}

const theaters: theater[] = [
    {
        name: "cinemark",
        description: "new Theater",
        locationUrl: "someurl",
        address: "some address",
        screenDetails: ["screen1", "screen2"],
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        nScreens: 2,
        email: "cinemark@gmail.com",
        phoneNumber: "1234567890",
    },
    {
        name: "cinemark",
        description: "new Theater",
        locationUrl: "someurl",
        address: "some address",
        screenDetails: ["screen1", "screen2"],
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        nScreens: 2,
        email: "cinemark@gmail.com",
        phoneNumber: "1234567890",
    },
    {
        name: "cinemark",
        description: "new Theater",
        locationUrl: "someurl",
        address: "some address",
        screenDetails: ["screen1", "screen2"],
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        nScreens: 2,
        email: "cinemark@gmail.com",
        phoneNumber: "1234567890",
    },
    {
        name: "cinemark",
        description: "new Theater",
        locationUrl: "someurl",
        address: "some address",
        screenDetails: ["screen1", "screen2"],
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        nScreens: 2,
        email: "cinemark@gmail.com",
        phoneNumber: "1234567890",
    },
    {
        name: "cinemark",
        description: "new Theater",
        locationUrl: "someurl",
        address: "some address",
        screenDetails: ["screen1", "screen2"],
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        nScreens: 2,
        email: "cinemark@gmail.com",
        phoneNumber: "1234567890",
    },
    {
        name: "cinemark",
        description: "new Theater",
        locationUrl: "someurl",
        address: "some address",
        screenDetails: ["screen1", "screen2"],
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        nScreens: 2,
        email: "cinemark@gmail.com",
        phoneNumber: "1234567890",
    },
    {
        name: "cinemark",
        description: "new Theater",
        locationUrl: "someurl",
        address: "some address",
        screenDetails: ["screen1", "screen2"],
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        nScreens: 2,
        email: "cinemark@gmail.com",
        phoneNumber: "1234567890",
    },
];

export default function Theater() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        theater_name: "",
        description: "",
        city: "",
        location_url: "",
        zipcode: "",
        phno: "",
        email: "",
        address: "",
        state: "",
    });
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
    const [formSuccess, setFormSuccess] = useState(false)
    const [formSuccessMessage, setFormSuccessMessage] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);

    const handleInput = (e: any) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }
    const handleFileChange = (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
        accept: "image/*",
    });

    const submitForm = (e: any) => {
        e.preventDefault()
        if (selectedFile) {
            const formURL = e.target.action
            const data = new FormData()
            data.append('file', selectedFile);
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            console.log(data);
            const get_data = getDataFromEndPoint(data, formURL, 'POST');
            setFormSuccess(true);
            console.log(get_data);
        }
    }
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const addScreen = () => {
        router.push("/theater/1/screens")
    }
    const [open, setOpen] = React.useState<boolean>(false);
    const handleClose = () => setOpen(false);
    return (
        <React.Fragment>
            <CssBaseline />
            <Container style={{ backgroundColor: "#F9FBE7", marginLeft: "0px", marginRight: "0px", maxWidth: "2000px", marginTop: "3%" }}>
                {/* <Box sx={{ bgcolor: '#cfe8fc', display: 'flex', minHeight: '100vh' }}> */}
                <Grid container spacing={2}>
                    <Grid item xs={12} container justifyContent="flex-end" sx={{ mb: 2, marginTop: 5 }}>
                        <Typography variant="h4" style={{ marginRight: "40%" }}>Theaters</Typography>
                        <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => setOpen(true)} style={{ backgroundColor: "#AFB42B", color: "black", fontSize: "bold" }}>
                            Add Theater
                        </Button>
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid container spacing={2} alignItems="center" justifyContent="left">
                            {theaters.map((theater, index) => (
                                <Grid item xs={12} md={6} lg={4} key={index}>
                                    <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
                                        <img src={theater.imageUrl} alt="Theater" style={{ marginBottom: 16, marginRight: 24, width: 192, borderRadius: 8 }} />
                                        <Box sx={{ flex: 1 }}>
                                            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                                <Link href={theater.locationUrl} target="_blank" rel="noopener noreferrer" underline="hover" style={{ textDecoration: "none" }}>
                                                    <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 'medium', fontSize: '2rem' }} style={{}} color="#01579B">{theater.name}</Typography>
                                                </Link>
                                                <Box>
                                                    <Button startIcon={<EditIcon />} sx={{ px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }} />
                                                    <Button sx={{ px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }} onClick={addScreen}>
                                                        Show Screens
                                                    </Button>
                                                </Box>
                                            </Grid>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>{theater.description}</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '1rem' }}>{theater.address}</Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
                                                <Box sx={{ bgcolor: 'blue.100', color: 'blue.800', px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }}>{`Screens: ${theater.nScreens}`}</Box>
                                                {theater.screenDetails.map((screen, screenIndex) => (
                                                    <Button key={screenIndex} sx={{ px: 1, py: 0.5, borderRadius: 1, mr: 1, mb: 1, fontSize: '1rem' }}>{screen}</Button>
                                                ))}
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: 'text.secondary' }}>
                                                <Box sx={{ mr: 2 }}><i className="fas fa-envelope mr-1"></i>{theater.email}</Box>
                                                <Box><i className="fas fa-phone mr-1"></i>{theater.phoneNumber}</Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                {/* </Box> */}
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
                            <Stack direction="column" spacing={2}>
                                {formSuccess ?
                                    ('successs') : ('')}
                                <form onSubmit={submitForm} encType='multipart/form-data' action='/Theater/addtheater'>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                            sx={{ width: 200 }}
                                            component="label"
                                            variant="contained"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            {selectedFile ? (
                                                <>
                                                    File Uploaded <CheckCircleOutlineIcon sx={{ ml: 1 }} />
                                                </>
                                            ) : (
                                                'Upload Image'
                                            )}
                                            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                                        </Button>
                                    </Box>
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} md={12} lg={6}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="theater_name"
                                                label="Theater Name"
                                                name="theater_name"
                                                autoComplete="theater"
                                                autoFocus
                                                onChange={handleInput}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="description"
                                                label="Description"
                                                name="description"
                                                autoComplete="description"
                                                autoFocus
                                                onChange={handleInput}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="phno"
                                                label="Phone Number"
                                                name="phno"
                                                autoComplete="phno"
                                                autoFocus
                                                onChange={handleInput}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                autoFocus
                                                type="email"
                                                onChange={handleInput}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={6}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="address"
                                                label="Address"
                                                name="address"
                                                autoComplete="address"
                                                autoFocus
                                                onChange={handleInput}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="city"
                                                label="City"
                                                name="city"
                                                autoComplete="city"
                                                autoFocus
                                                onChange={handleInput}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="zipcode"
                                                label="Zip Code"
                                                name="zipcode"
                                                autoComplete="zipcode"
                                                autoFocus
                                                onChange={handleInput}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="state"
                                                label="State"
                                                name="state"
                                                autoComplete="state"
                                                autoFocus
                                                onChange={handleInput}
                                            />
                                        </Grid>
                                    </Grid>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="location_url"
                                        label="Location Url"
                                        name="location_url"
                                        autoComplete="location_url"
                                        autoFocus
                                        onChange={handleInput}
                                    />

                                    <Button variant="contained" endIcon={<SendIcon />} style={{ width: "300px", left: '125px' }} type="submit">
                                        Add Theater
                                    </Button>
                                </form>
                            </Stack>
                        </Box>
                    </Fade>
                </Modal>
            </Container>
        </React.Fragment >
    )
}