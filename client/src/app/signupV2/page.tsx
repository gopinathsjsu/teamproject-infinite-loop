'use client'
import * as React from 'react';
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
import PersonalDetailsForm from './PersonalDetailsForm';
import AddressForm from './AddressForm';
import AdditionalDetailsForm from './AdditionalDetailsForm';
import Script from 'next/script';
import { getDataFromEndPoint } from '@/src/lib/backend-api';
import { useRouter } from 'next/navigation';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Personal Details', 'Address', 'Additional Information'];

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const router = useRouter();

    const [data, setData] = React.useState({
        stepOneData: {},
        stepTwoData: {},
        stepThreeData: {},
    });

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <PersonalDetailsForm data={data.stepOneData} onNext={handleNext} />;
            case 1:
                return <AddressForm data={data.stepTwoData} onNext={handleNext} onBack={handleBack}/>;
            case 2:
                return <AdditionalDetailsForm data={data.stepThreeData} onNext={handleNext} onBack={handleBack}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    async function submitSignIn(){
        const reqData = new FormData();
        Object.entries(data).forEach(([stepDataKey,stepData])=>{
            Object.entries(stepData).forEach(([key,value])=>{
                if(key=='selectedFile'){
                    reqData.append('file',value as string | Blob);
                }else{
                    if(Array.isArray(value)){
                        reqData.append(key,(value as string[]).join(", "));
                    }else{
                        reqData.append(key, value as string);
                    }
                }
            })
        });

        const response = await getDataFromEndPoint(reqData, 'user/signup' ,'POST');
        if(response.status == 200){
            console.log('success');
            router.push('/signin');
        }
    }

    const handleNext = (stepData:any,stepIndex:string) => {
        setData((prevData) => ({ ...prevData, [stepIndex]: stepData }));
        if(activeStep == steps.length-1){
            submitSignIn();
            return;
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = (stepData:any,stepIndex:string) => {
        setData((prevData) => ({ ...prevData, [stepIndex]: stepData }));
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAH_4KikoUaqV41Fq09gBEsXzADYU1xM8w&libraries=places`}
                strategy="beforeInteractive"
            />
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
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Box Office
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Sign Up
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
                                Success!!
                            </Typography>
                            <Typography variant="subtitle1">
                                LogIn to enjoy movies
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {/* {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )} */}
                                {/* <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Sign In' : 'Next'}
                                </Button> */}
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </Container>
        </React.Fragment>
    );
}