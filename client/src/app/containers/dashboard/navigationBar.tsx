import * as React from 'react';
import { useParams, useRouter } from "next/navigation";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { Backdrop, Drawer, Fade, List, ListItem, ListItemText, ListSubheader, Modal, Stack } from '@mui/material';

import LocationSearchInput from './LocationSearchInput'; // adjust the path as necessary
import Script from 'next/script';
import useStore from '@/src/store';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const MapIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
    left: '-60px'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const pages = [
    { name: 'Movies', route: '/movies/all' },
    { name: 'Theaters', route: '/theater' },
    { name: 'Arists', route: '/artist/all' }
];
const settings = [
    { name: 'Profile', route: '/personal_profile' },
    { name: 'Purchases', route: '/purchases' },
    { name: 'Rewards', route: '/rewards' },
{ name: 'Manage Membership', route: 'https://billing.stripe.com/p/login/test_cN23e27JRdQPeMEbII' },
    { name: 'Logout', route: '/logout', icon: 'LogoutIcon' },
];

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ResponsiveAppBar() {

    const router = useRouter();
const [imageUrl, setImageUrl] = React.useState('/static/images/avatar/2.jpg');
    const [location, setLocation] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const store:any = useStore();

React.useEffect(() => {
        const user = store.user;
        if(user != null){
            setImageUrl(user.profile_url);
        }
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };


    function redirectToPage(page: any) {
        if(page.name == 'Logout'){
            store.setLoggedOut();
            router.push('/');
            return;
        }
        router.push(page.route);
    }

    function sendLocation(location: any) {
        console.log(location);
        setOpen(false);
        setLocation(location.split(",")[0]);
    }

    const [open, setOpen] = React.useState<boolean>(false);
    const handleClose = () => setOpen(false);

    function navigateToSignUp() {
        router.push('/signup')
    }

    function navigateToSignIn() {
        router.push('/signin')
    }

    return (
        <Box>
            <AppBar position="static">
                <Script
                    src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAH_4KikoUaqV41Fq09gBEsXzADYU1xM8w&libraries=places`}
                    strategy="beforeInteractive"
                />
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Box Office
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <Typography onClick={() => { redirectToPage(page) }} textAlign="center" > {page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Box Office
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => { redirectToPage(page) }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        <Search sx={({ mr: '20px' })}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Button
                            key="location"
                            onClick={() => { setOpen(true) }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Search>
                                <MapIconWrapper>
                                    <PinDropIcon />
                                </MapIconWrapper>
                            </Search>
                            {location != null ? location : "Select Location"}
                        </Button>
                        {store.isLoggedIn ?
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleDrawerOpen} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src={imageUrl} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                            <Typography onClick={() => { redirectToPage(setting) }} textAlign="center">{setting.name}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            :
                            <Box>
                                <Button onClick={navigateToSignUp} key="signup" sx={{ my: 2, fontWeight: 700, color: 'inherit', textDecoration: 'none' }} >
                                    Sign Up
                                </Button>
                                <Button onClick={navigateToSignIn} key="signin" sx={{ my: 2, fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>
                                    Sign In
                                </Button>
                            </Box>
                        }
                    </Toolbar>
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
                            ...style,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '600px',
                            maxWidth: '1000px',
                            height: '400px'
                        }} >
                            <LocationSearchInput sendLocation={sendLocation} />
                        </Box>
                    </Fade>
                </Modal>
            </AppBar >
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
            >
                <Box
                    sx={{
                        width: 250
                    }}
                    role="presentation"
                    onClick={handleDrawerClose}
                    onKeyDown={handleDrawerClose}
                >
                    <List
                        subheader={
                            <ListSubheader
                                component="div"
                                id="nested-list-subheader"
                                sx={{
                                    backgroundColor: (theme) => theme.palette.primary.main,
                                    color: (theme) => theme.palette.primary.contrastText,
                                    fontWeight: 'bold',
                                    fontSize: '2rem',
                                    lineHeight: 'normal',
                                    height: '70px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                Hello
                            </ListSubheader>
                        }
                    >
                        {settings.map((setting, index) => (
                            <ListItem button key={setting.name} onClick={() => redirectToPage(setting)}>
                                <ListItemText primary={setting.name} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
export default ResponsiveAppBar;