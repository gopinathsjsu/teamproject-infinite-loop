'use client'
import * as React from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { apiRegisterUser } from '@/src/lib/auth-api';
import { handleApiError } from '@/src/lib/helpers';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterUserSchema } from '@/src/lib/validations/user.schema';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Box Office
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {

    const [loading, setLoading] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: zodResolver(RegisterUserSchema),});
    const onSubmit = (data: any) => {
        registerUser(data);
    }

    const getErrorMessage = (error: any) => {
        return error && typeof error.message === 'string' ? error.message : '';
    };

    async function registerUser(data: any){        
        setLoading(true);
        try {
            const user = await apiRegisterUser(JSON.stringify(data));
            // return router.push("/login");
        } catch (error: any) {
            if (error instanceof Error) {
                handleApiError(error);
            } else {
                toast.error(error.message);
                console.log("Error message:", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                {...register('name')}
                                fullWidth
                                id="name"
                                label="Full Name"
                                autoFocus
                                error={!!errors.name}
                                helperText={getErrorMessage(errors.name)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('email')}
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                error={!!errors.email}
                                helperText={getErrorMessage(errors.email)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('password')}
                                fullWidth
                                type="password"
                                id="password"
                                label="Password"
                                autoComplete="new-password"
                                error={!!errors.password}
                                helperText={getErrorMessage(errors.password)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('confirmPassword')}
                                fullWidth
                                type="password"
                                id="confirmPassword"
                                label="Confirm Password"
                                error={!!errors.confirmPassword}
                                helperText={getErrorMessage(errors.confirmPassword)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {!loading ? <span> Sign Up</span> : <span>Loading...</span>}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}