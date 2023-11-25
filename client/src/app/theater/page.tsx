"use client";
import { getDataFromEndPoint } from "@/src/lib/backend-api";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Grid, Typography, Button, Link, Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Fade from "@mui/material/Fade";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import useStore from "@/src/store";


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

const schema = zod.object({
  theater_name: zod.string().min(1, "Screen Name is required"),
  description: zod
    .string()
    .min(1, "description is required")
    .max(350, "Must be under 350 chareceters"),
  city: zod.string().min(1, "city is required"),
  location_url: zod
    .string()
    .min(1, "locationUrl is required")
    .url("Invalid Url"),
  address: zod.string().min(1, "address is required"),
  zipcode: zod.string().refine((value) => /^\d{5}$/.test(value), {
    message: "Invalid ZipCode number. Must be 5 digits.",
  }),
  email: zod.string().min(1, "Email is required").email("Email is invalid"),
  // phno: zod.number().min(1, 'Phone Number is required').max(10, 'Phone number should have only 10 digits'),
  phno: zod.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Invalid phone number. Must be 10 digits.",
  }),
  state: zod.string().min(1, "state is required"),
});

interface Theater {
  name: string;
  description: string;
  locationUrl: string;
  address: string;
  screenDetails: string[];
  imageUrl: string;
  nScreens: number;
  email: string;
  phoneNumber: string;
  id: string;
}

// const theaters: Theater[] = [
//     {
//         name: "cinemark",
//         description: "new Theater",
//         locationUrl: "someurl",
//         address: "some address",
//         screenDetails: ["screen1", "screen2"],
//         imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
//         nScreens: 2,
//         email: "cinemark@gmail.com",
//         phoneNumber: "1234567890",
//     },
//     {
//         name: "cinemark",
//         description: "new Theater",
//         locationUrl: "someurl",
//         address: "some address",
//         screenDetails: ["screen1", "screen2"],
//         imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
//         nScreens: 2,
//         email: "cinemark@gmail.com",
//         phoneNumber: "1234567890",
//     },
//     {
//         name: "cinemark",
//         description: "new Theater",
//         locationUrl: "someurl",
//         address: "some address",
//         screenDetails: ["screen1", "screen2"],
//         imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
//         nScreens: 2,
//         email: "cinemark@gmail.com",
//         phoneNumber: "1234567890",
//     },
//     {
//         name: "cinemark",
//         description: "new Theater",
//         locationUrl: "someurl",
//         address: "some address",
//         screenDetails: ["screen1", "screen2"],
//         imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
//         nScreens: 2,
//         email: "cinemark@gmail.com",
//         phoneNumber: "1234567890",
//     },
//     {
//         name: "cinemark",
//         description: "new Theater",
//         locationUrl: "someurl",
//         address: "some address",
//         screenDetails: ["screen1", "screen2"],
//         imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
//         nScreens: 2,
//         email: "cinemark@gmail.com",
//         phoneNumber: "1234567890",
//     },
//     {
//         name: "cinemark",
//         description: "new Theater",
//         locationUrl: "someurl",
//         address: "some address",
//         screenDetails: ["screen1", "screen2"],
//         imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
//         nScreens: 2,
//         email: "cinemark@gmail.com",
//         phoneNumber: "1234567890",
//     },
//     {
//         name: "cinemark",
//         description: "new Theater",
//         locationUrl: "someurl",
//         address: "some address",
//         screenDetails: ["screen1", "screen2"],
//         imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
//         nScreens: 2,
//         email: "cinemark@gmail.com",
//         phoneNumber: "1234567890",
//     },
// ];

export default function Theater() {
  const router = useRouter();
  const [theaterData, setTheaterData] = useState<Theater[]>([]);
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
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [formSuccess, setFormSuccess] = useState(false);
  const store: any = useStore();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };
  const handleFileChange = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
    accept: "image/*",
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await getDataFromEndPoint("", "theater/all", "GET");
      const data = response.data;
      const mappedData: Theater[] = data.map((theaterItem: any) => ({
        name: theaterItem.name,
        description: theaterItem.description,
        locationUrl: theaterItem.theater_url,
        address: theaterItem.address,
        screenDetails: theaterItem.screen_ids,
        imageUrl: theaterItem.image_url,
        nScreens: theaterItem.screen_ids.length,
        email: theaterItem.mail, // Replace with actual email property from your data
        phoneNumber: theaterItem.mobile,
        id: theaterItem.id, // Assuming mobile is a number
      }));
      console.log(mappedData);
      setTheaterData(mappedData);
      console.log(theaterData);
    };

    fetchData();
  }, []);
  const onSubmit = async (e: any) => {
    if (selectedFile) {
      const formURL = "theater/add";
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("data", JSON.stringify(e));
      console.log(data);
      const get_data = await getDataFromEndPoint(data, formURL, "POST");
      if (get_data.status === 200) {
        console.log(get_data);
        const data_req = [get_data.data];
        console.log(data_req);
        const mappedData: Theater[] = data_req.map((theaterItem: any) => ({
          name: theaterItem.name,
          description: theaterItem.description,
          locationUrl: theaterItem.theater_url,
          address: theaterItem.address,
          screenDetails: theaterItem.screen_ids,
          imageUrl: theaterItem.image_url,
          nScreens: theaterItem.screen_ids.length,
          email: theaterItem.mail,
          phoneNumber: theaterItem.mobile,
          id: theaterItem.id,
        }));
        setTheaterData([...theaterData, ...mappedData]);
      }
      setFormSuccess(true);
    }
    setIsFile(true);
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const getErrorMessage = (error: any) => {
    return error && typeof error.message === "string" ? error.message : "";
  };

  const addScreen = (theaterId: any) => {
    router.push("/theater/" + theaterId + "/screens/");
  };
  const [open, setOpen] = React.useState<boolean>(false);
  const [isFile, setIsFile] = React.useState<boolean>(false);
  const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="xl"
        style={{ marginLeft: "0px", marginRight: "0px", marginTop: "3%" }}
      >
        {/* <Box sx={{ bgcolor: '#cfe8fc', display: 'flex', minHeight: '100vh' }}> */}
        <Grid container spacing={2}>
          <Grid
            container
            sx={{ mb: 2, marginTop: 10, justifyContent: "space-between" }}
          >
            <Typography variant="h4">Theaters</Typography>
            {store.isAdmin && (
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setOpen(true)}
            >
              Add Theater
            </Button>)}
          </Grid>
          <Grid item xs={12} container>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="left"
            >
              {theaterData.map((theater, index) => (
                <Grid item xs={12} md={6} lg={6} key={index}>
                  <Box
                    sx={{
                      bgcolor: "white",
                      p: 3,
                      borderRadius: 2,
                      boxShadow: 3,
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={theater.imageUrl}
                      alt="Theater"
                      style={{
                        marginBottom: 16,
                        marginRight: 24,
                        width: 192,
                        borderRadius: 8,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 3 }}
                      >
                        <Link
                          href={theater.locationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="hover"
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              mb: 1,
                              fontWeight: "medium",
                              fontSize: "2rem",
                            }}
                            style={{}}
                            color="#01579B"
                          >
                            {theater.name}
                          </Typography>
                        </Link>
                        <Box>
                          <Button
                            startIcon={<EditIcon />}
                            sx={{
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              mr: 1,
                              mb: 1,
                              fontSize: "1rem",
                            }}
                          />
                          <Button
                            sx={{
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              mr: 1,
                              mb: 1,
                              fontSize: "1rem",
                            }}
                            onClick={() => addScreen(theater.id)}
                          >
                            Show Screens
                          </Button>
                        </Box>
                      </Grid>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "1rem" }}
                      >
                        {theater.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, fontSize: "1rem" }}
                      >
                        {theater.address}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "blue.100",
                            color: "blue.800",
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            mr: 1,
                            mb: 1,
                            fontSize: "1rem",
                          }}
                        >{`Screens: ${theater.nScreens}`}</Box>
                        {theater.screenDetails.map((screen, screenIndex) => (
                          <Button
                            key={screenIndex}
                            sx={{
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              mr: 1,
                              mb: 1,
                              fontSize: "1rem",
                            }}
                          >
                            {screen}
                          </Button>
                        ))}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "0.875rem",
                          color: "text.secondary",
                        }}
                      >
                        <Box sx={{ mr: 2 }}>
                          <i className="fas fa-envelope mr-1"></i>
                          {theater.email}
                        </Box>
                        <Box>
                          <i className="fas fa-phone mr-1"></i>
                          {theater.phoneNumber}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
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
                ...style, // Your existing styles
                display: "flex", // Ensures flexbox layout
                justifyContent: "center", // Centers horizontally
                alignItems: "center", // Centers vertically
                // Full width of the parent
                width: "600px",
                maxWidth: "1000px",
              }}
            >
              <Stack direction="column" spacing={2}>
                {formSuccess ? "successs" : ""}
                <form
                  encType="multipart/form-data"
                  action="/Theater/addtheater"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      sx={{ width: 200 }}
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      {selectedFile ? (
                        <>
                          File Uploaded{" "}
                          <CheckCircleOutlineIcon sx={{ ml: 1 }} />
                        </>
                      ) : (
                        "Upload Image"
                      )}
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange}
                      />
                      {isFile && !selectedFile ? (
                        <Typography>File required</Typography>
                      ) : (
                        ""
                      )}
                    </Button>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={6}>
                      <Controller
                        name="theater_name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            id="theater_name"
                            label="Theater Name"
                            autoComplete="theater"
                            autoFocus
                            error={!!errors.theater_name}
                            helperText={getErrorMessage(errors.theater_name)}
                          />
                        )}
                      />
                      <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            id="description"
                            label="Description"
                            autoComplete="description"
                            autoFocus
                            error={!!errors.description}
                            helperText={getErrorMessage(errors.description)}
                          />
                        )}
                      />
                      <Controller
                        name="phno"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            id="phno"
                            label="Phone Number"
                            autoComplete="phno"
                            autoFocus
                            error={!!errors.phno}
                            helperText={getErrorMessage(errors.phno)}
                          />
                        )}
                      />
                      <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            type="email"
                            error={!!errors.email}
                            helperText={getErrorMessage(errors.email)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                      <Controller
                        name="address"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            id="address"
                            label="Address"
                            autoComplete="address"
                            autoFocus
                            error={!!errors.address}
                            helperText={getErrorMessage(errors.address)}
                          />
                        )}
                      />
                      <Controller
                        name="city"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            id="city"
                            label="City"
                            autoComplete="city"
                            autoFocus
                            error={!!errors.city}
                            helperText={getErrorMessage(errors.city)}
                          />
                        )}
                      />
                      <Controller
                        name="zipcode"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            id="zipcode"
                            label="Zip Code"
                            name="zipcode"
                            autoComplete="zipcode"
                            autoFocus
                            error={!!errors.zipcode}
                            helperText={getErrorMessage(errors.zipcode)}
                          />
                        )}
                      />
                      <Controller
                        name="state"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            id="state"
                            label="State"
                            name="state"
                            autoComplete="state"
                            autoFocus
                            error={!!errors.state}
                            helperText={getErrorMessage(errors.state)}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Controller
                    name="location_url"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        margin="normal"
                        fullWidth
                        id="location_url"
                        label="Location Url"
                        autoComplete="location_url"
                        autoFocus
                        error={!!errors.location_url}
                        helperText={getErrorMessage(errors.location_url)}
                      />
                    )}
                  />

                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    style={{ width: "300px", left: "125px" }}
                    type="submit"
                  >
                    Add Theater
                  </Button>
                </form>
              </Stack>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </React.Fragment>
  );
}
