'use client'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Footer from './footer';
import ResponsiveAppBar from './navigationBar';
import { mainListItems, secondaryListItems } from './listItems';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import LoadingAnimation from './loading/page';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}



const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function Layout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    const [showToggle, setShowToggle] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

        const [isLoading, setIsLoading] = useState(true);
      
        useEffect(() => {
          // Replace this with your actual loading logic
          const timer = setTimeout(() => {
            setIsLoading(false);
          }, 500); // Simulate loading for 2 seconds
      
          return () => clearTimeout(timer);
        }, []);
      
        if (isLoading) {
          return <LoadingAnimation />; // Show loading animation while loading
        }

    return (
        <Box>

            {/* <AppBar position="absolute" open={open}>
                 
                <Toolbar sx={{ pr: '24px' }}
                    // keep right padding when drawer closed 
                >
                    {showToggle && <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    }
                    <Typography
                        // component="h1"
                        // variant="h6"
                        // color="inherit"
                        // noWrap
                        // sx={{ flexGrow: 1 }}
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                          mr: 2,
                          display: { xs: 'none', md: 'flex' },
                          color: 'inherit',
                          textDecoration: 'none',
                        }}
                    >
                        Box Office
                    </Typography>
                    <Button color="inherit" variant="text">Sign Up</Button>
                    <Button color="inherit" variant="text">Sign In</Button>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            {showToggle && <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {mainListItems}
                    <Divider sx={{ my: 1 }} />
                    {secondaryListItems}
                </List>
            </Drawer>
            } */}
            < ResponsiveAppBar />
            {/* flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto', */}
                <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
                >
                <Container maxWidth={false} component="main" sx={{ flex: 1 }}>
                    {children}
                </Container>
                <Footer />
                </Box>
        </Box>
    );
}