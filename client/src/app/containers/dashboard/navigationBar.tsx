import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import PinDropIcon from "@mui/icons-material/PinDrop";
import {
    Backdrop,
    Drawer,
    Fade,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Modal,
    createFilterOptions,
} from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import LocationSearchInput from "./LocationSearchInput"; // adjust the path as necessary
import Script from "next/script";
import useStore from "@/src/store";
import Discount from "./discount";

const MapIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
    left: "-70px",
}));

const pages = [
    { name: "Movies", route: "/movies/all" },
    { name: "Theaters", route: "/theater" },
    { name: "Arists", route: "/artist/all" },
    { name: 'Manage Discounts', route: 'openModal' },
];
const profileSettings = [
    { name: 'Profile', route: '/personal_profile' },
    { name: 'Purchases', route: '/purchases' },
    { name: 'Rewards', route: '/rewards' },
    { name: 'Manage Membership', route: 'https://billing.stripe.com/p/login/test_cN23e27JRdQPeMEbII' },
    { name: 'Logout', route: '/logout', icon: 'LogoutIcon' },
];

const adminSettings = [
    { name: 'Profile', route: '/personal_profile' },
    { name: 'Logout', route: '/logout' },
]

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function ResponsiveAppBar() {
    const router = useRouter();
    const [imageUrl, setImageUrl] = React.useState("/static/images/avatar/2.jpg");
    const filter = createFilterOptions<MovieOptionType>();
    const [location, setLocation] = React.useState("");
    const [value, setValue] = React.useState<MovieOptionType | null>({
        id: "",
        name: "",
        profile_url: "",
    });
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    const store: any = useStore();
    const [movieData, setMovieData] = useState<MovieOptionType[]>([]);
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState<any[]>([]);
    const [opeDiscounts, setOpenDiscounts] = useState<boolean>(false);

    React.useEffect(() => {
        fetchMovieData();
        const user = store.user;
        if (user != null && user.isAdmin) {
            setSettings(adminSettings);
        } else {
            setSettings(profileSettings);
        }
        if (user != null) {
            setImageUrl(user.profile_url);
        }
    }, []);

    const fetchMovieData = async () => {
        try {
            const response = await fetch("http://localhost:8080/movie/all");
            const data = await response.json();
            const mappedData = data.movies.map((movie: any) => ({
                id: movie.id,
                name: movie.title,
                profile_url: movie.poster_url, // Assuming this is the property for the movie image
            }));
            setMovieData(mappedData);
        } catch (error) {
            console.error("Failed to fetch movie data:", error);
        }
    };

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

    interface MovieOptionType {
        id: string;
        name: string;
        profile_url: string;
    }

    const handleCardClick = (movieId: string) => {
        router.push(`/movies/${movieId}`);
    };

    const Search = styled("div")(({ theme }) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    }));

    function redirectToPage(page: any) {
        if (page.name == 'Logout') {
            store.setIsAdmin(false);
            store.setLoggedOut();
            router.push('/');
            return;
        }
        else if (page.route == 'openModal') {
            setOpenDiscounts(true);
            return;
        }
        router.push(page.route);
    }

    function sendLocation(addressComponents: any) {
        const getAddressComponent = (type: string) => {
            return addressComponents.find((component: any) => component.types.includes(type))?.long_name || '';
        };
        const street = getAddressComponent('route');
        const streetNumber = getAddressComponent('street_number');
        const formattedAddress1 = `${streetNumber} ${street}`;
        setOpen(false);
        setLocation(formattedAddress1);
        store.setPinCode(getAddressComponent('postal_code'));
        console.log(store.pincode + "hehhehhehehheheh");
        router.push('/');

    }

    const handleClose = () => {
        setOpen(false);
        setOpenDiscounts(false);
    };

    function navigateToSignUp() {
        router.push("/signup");
    }

    function navigateToSignIn() {
        router.push("/signin");
    }

    const Logo = () => {
        const logoUrl = "https://drive.google.com/uc?export=view&id=1gF49xuN0t0yjIv7WoybLhTScP6b15-fJ"; // Direct link
        return (
            <img src={logoUrl} alt="Box Office Logo" style={{ width: 'auto', height: '50px' }} /> // Adjust height as needed
        );
    };

    function submitSuccess(){
        setOpenDiscounts(false);
    }

    return (
        <Box>
            <AppBar position="static">
                <Script
                    src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAH_4KikoUaqV41Fq09gBEsXzADYU1xM8w&libraries=places`}
                    strategy="afterInteractive"
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

                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                {pages.map((page) => {
                                    if (page.route !== "openModal" || (page.route === "openModal" && store.isAdmin)) {
                                        return (
                                            <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                                <Typography
                                                    onClick={() => {
                                                        redirectToPage(page);
                                                    }}
                                                    textAlign="center"
                                                >
                                                    {" "}
                                                    {page.name}
                                                </Typography>
                                            </MenuItem>
                                        )
                                    }
                                    return null;
                                })}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontWeight: 700,
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            Box Office
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            {pages.map((page) => {
                                if (page.route !== "openModal" || (page.route === "openModal" && store.isAdmin)) {
                                    return (<Button
                                        key={page.name}
                                        onClick={() => {
                                            redirectToPage(page);
                                        }}
                                        sx={{ my: 2, color: "white", display: "block" }}
                                    >
                                        {page.name}
                                    </Button>
                                    )
                                }
                                return null;
                            })}
                        </Box>
                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) =>
                                setValue(newValue as MovieOptionType | null)
                            }
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                const { inputValue } = params;
                                const isExisting = options.some(
                                    (option) => inputValue === option.name
                                );
                                if (inputValue !== "" && !isExisting) {
                                    filtered.push({
                                        id: inputValue.toLowerCase().replace(/\s/g, "-"),
                                        name: inputValue,
                                        profile_url: "",
                                    });
                                }

                                return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id="movie-search"
                            options={movieData}
                            getOptionLabel={(option) =>
                                typeof option === 'string' ? option : option.name
                            }
                            renderOption={(props, option) => (
                                <Box
                                    component="li"
                                    {...props}
                                    onClick={() => handleCardClick(option.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <Avatar
                                        src={option.profile_url}
                                        alt={option.name}
                                        sx={{ width: 30, height: 30, marginRight: "10px" }}
                                    />
                                    {option.name}
                                </Box>
                            )}
                            sx={{
                                position: "relative",
                                borderRadius: 4,
                                backgroundColor: "transparent",
                                width: 300,
                                marginLeft: 0,
                                padding: "8px 30px",
                                color: "white",
                                borderColor: '#FFFFFF',
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "white",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "white",
                                    },
                                    "& .MuiInputBase-input": {
                                        color: "white",
                                    },
                                    "& .MuiAutocomplete-clearIndicator": {
                                        color: "white", // Set the clear icon color to white
                                    },
                                },
                            }}
                            freeSolo
                            renderInput={(params) => (
                                <Box>
                                    <TextField
                                        {...params}
                                        label="Search movies"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon sx={{ color: 'white' }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: "white" },
                                            sx: {
                                                backgroundColor: "transparent",
                                                "&::placeholder": {
                                                    color: "white", // Set the placeholder color to white
                                                },
                                            },
                                        }}
                                        InputLabelProps={{
                                            style: { color: "white" }, // Set the color of the label to white
                                        }}
                                        sx={{
                                            "& .MuiInputLabel-outlined": {
                                                color: "white", // Set the color of the label to white
                                            },
                                            "& .MuiInputLabel-outlined.Mui-focused": {
                                                color: "white", // Set the color of the label to white when focused
                                            },
                                            "& .MuiInputBase-input": {
                                                color: "white", // Set the color of the input text to white
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: "white", // Set the border color to white
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "white", // Set the border color to white on hover
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "white", // Set the border color to white when focused
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            )}
                        />

                        <Button
                            key="location"
                            onClick={() => {
                                setOpen(true);
                            }}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            <Search>
                                <MapIconWrapper>
                                    <PinDropIcon />
                                </MapIconWrapper>
                            </Search>
                            {location != "" ? location : "Select Pincode"}
                        </Button>
                        {store.isLoggedIn ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleDrawerOpen} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src={imageUrl} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                            <Typography
                                                onClick={() => {
                                                    redirectToPage(setting);
                                                }}
                                                textAlign="center"
                                            >
                                                {setting.name}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        ) : (
                            <Box>
                                <Button
                                    onClick={navigateToSignUp}
                                    key="signup"
                                    sx={{
                                        my: 2,
                                        fontWeight: 700,
                                        color: "inherit",
                                        textDecoration: "none",
                                    }}
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    onClick={navigateToSignIn}
                                    key="signin"
                                    sx={{
                                        my: 2,
                                        fontWeight: 700,
                                        color: "inherit",
                                        textDecoration: "none",
                                    }}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        )}
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
                        <Box
                            sx={{
                                ...style,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "600px",
                                maxWidth: "1000px",
                                height: "400px",
                            }}
                        >
                            <LocationSearchInput sendLocation={sendLocation} />
                        </Box>
                    </Fade>
                </Modal>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={opeDiscounts}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={opeDiscounts}>
                        <Box
                            sx={{
                                ...style,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "600px",
                                maxWidth: "1000px",
                                height: "400px",
                            }}
                        >
                           <Discount submitSuccess={submitSuccess}/>
                        </Box>
                    </Fade>
                </Modal>
            </AppBar>
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
                <Box
                    sx={{
                        width: 250,
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
                                    fontWeight: "bold",
                                    fontSize: "2rem",
                                    lineHeight: "normal",
                                    height: "70px",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                Hello
                            </ListSubheader>
                        }
                    >
                        {settings.map((setting, index) => (
                            <ListItem
                                button
                                key={setting.name}
                                onClick={() => redirectToPage(setting)}
                            >
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
