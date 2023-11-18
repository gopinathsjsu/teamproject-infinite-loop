"use client";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import React, { useState } from "react";
import { getDataFromEndPoint } from '@/src/lib/backend-api';


const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step: number, handleFormSubmit: (data: any) => void) {
    switch (step) {
        case 0:
            return <AddressForm onSubmit={handleFormSubmit} />;
        case 1:
            return <PaymentForm onSubmit={handleFormSubmit} />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedFile, setSelectedFile] = React.useState("");
    const [formSuccess, setFormSuccess] = React.useState(false);
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
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const handleFormSubmit = (data: any) => {
        // Update the form data based on the current step
        setFormData((prevData) => ({
            ...prevData,
            [steps[activeStep].toLowerCase()]: data,
        }));

        // Move to the next step
        handleNext();
    };
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
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep, handleFormSubmit)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                    type='submit'
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </React.Fragment>
    );
}