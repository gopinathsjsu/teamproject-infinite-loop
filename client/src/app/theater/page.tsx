"use client";
import { getDataFromEndPoint } from "@/src/lib/backend-api";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Grid,
  Typography,
  Button,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

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
  const store: any = useStore();
  const router = useRouter();
  const [theaterData, setTheaterData] = useState<Theater[]>([]);
  const [formSuccess, setFormSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [theaterId, setTheaterId] = useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [isFile, setIsFile] = React.useState<boolean>(false);
  const isAdmin = store.isAdmin; // Replace with the actual way to get this info
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  const getErrorMessage = (error: any) => {
    return error && typeof error.message === "string" ? error.message : "";
  };
  const handleClose = () => {
    setOpen(false);
    if (enableEdit) {
      setEnableEdit(false);
      setTheaterId("");
    }
  };

  const handleFileChange = (e: any) => {
    e.preventDefault();
    setIsFile(true);
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDataFromEndPoint("", "theater/all", "GET");
      const data = response.data;
      const mappedData: Theater[] = data.map((theaterItem: any) => ({
        name: theaterItem.name,
        description: theaterItem.description,
        locationUrl: theaterItem.theater_url,
        address: theaterItem.state,
        city: theaterItem.city,
        state: theaterItem.state,
        zipcode: theaterItem.zipcode,
        screenDetails: theaterItem.screen_ids,
        imageUrl: theaterItem.image_url,
        nScreens: theaterItem.screen_ids.length,
        email: theaterItem.mail, // Replace with actual email property from your data
        phoneNumber: theaterItem.mobile,
        id: theaterItem.id, // Assuming mobile is a number
      }));
      setTheaterData(mappedData);
    };

    fetchData();
  }, []);

  const getTheaters = async () => {
    const response = await getDataFromEndPoint("", "theater/all", "GET");
    const data = response.data;
    const mappedData: Theater[] = data.map((theaterItem: any) => ({
      name: theaterItem.name,
      description: theaterItem.description,
      locationUrl: theaterItem.theater_url,
      address: theaterItem.state,
      city: theaterItem.city,
      state: theaterItem.state,
      zipcode: theaterItem.zipcode,
      screenDetails: theaterItem.screen_ids,
      imageUrl: theaterItem.image_url,
      nScreens: theaterItem.screen_ids.length,
      email: theaterItem.mail,
      phoneNumber: theaterItem.mobile,
      id: theaterItem.id,
    }));
    setTheaterData(mappedData);
  };

  const updateTheater = async (e: any) => {
    try {
      const formURL = "theater/updateTheater";
      const data = new FormData();
      if (selectedFile) {
        data.append("file", selectedFile);
      }
      e["id"] = theaterId;
      data.append("data", JSON.stringify(e));
      await getDataFromEndPoint(data, formURL, "POST");
      setOpen(false);
      setEnableEdit(false);
      setTheaterId("");
      getTheaters();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (e: any) => {
    if (enableEdit) {
      updateTheater(e);
      return;
    }
    if (selectedFile) {
      const formURL = "theater/add";
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("data", JSON.stringify(e));
      const get_data = await getDataFromEndPoint(data, formURL, "POST");
      if (get_data.status === 200) {
        getTheaters();
      }
      setOpen(false);
      setIsFile(false);
    }
  };

  async function deleteTheater(theaterId: any) {
    const formURL = "theater/deleteTheater";
    const data = { id: theaterId };
    const resp = await getDataFromEndPoint(data, formURL, "POST");
    if (resp != null) {
      getTheaters();
    }
  }

  function editTheater(theater: any) {
    setValue("theater_name", theater.name);
    setValue("description", theater.description);
    setValue("location_url", theater.locationUrl);
    setValue("city", theater.city);
    setValue("state", theater.state);
    setValue("address", theater.address);
    setValue("zipcode", theater.zipcode.toString());
    setValue("email", theater.email);
    setValue("phno", theater.phoneNumber.toString());
    setOpen(true);
    setEnableEdit(true);
    setTheaterId(theater.id);
  }

  const addScreen = (theaterId: any) => {
    router.push("/theater/" + theaterId + "/screens/");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container sx={{ mt: 5 }} spacing={2}>
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Typography variant="h4">Theaters</Typography>
          {isAdmin && (
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setOpen(true)}
            >
              Add Theater
            </Button>
          )}
        </Grid>
        <Grid item xs={12} container>
          <Grid container spacing={2} alignItems="center" justifyContent="left">
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
                            color: "#01579B",
                          }}
                        >
                          {theater.name}
                        </Typography>
                      </Link>
                      {isAdmin && (
                        <>
                          <Button
                            startIcon={<EditIcon />}
                            onClick={() => {
                              editTheater(theater);
                            }}
                          />
                          <Button
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                              deleteTheater(theater.id);
                            }}
                          />
                        </>
                      )}
                    </Grid>
                    <Button
                      variant="outlined"
                      sx={{ mb: 2 }}
                      onClick={() => addScreen(theater.id)}
                    >
                      Show Screens
                    </Button>
                    <Typography
                      variant="body2"
                      sx={{ ml: "10px", fontSize: "1rem" }}
                    >
                      {theater.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        fontSize: "0.875rem",
                        color: "text.secondary",
                        mt: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#f5f5f5",
                          borderRadius: "8px",
                          padding: "8px 16px",
                          maxWidth: "fit-content",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                          "&:hover": {
                            backgroundColor: "#e0e0e0",
                          },
                        }}
                      >
                        <EmailIcon
                          sx={{ marginRight: "8px", color: "#0077b5" }}
                        />
                        <Typography variant="body1">
                          <Link
                            href={`mailto:${theater.email}`}
                            underline="none"
                            sx={{ color: "#0077b5", fontWeight: "bold" }}
                          >
                            {theater.email}
                          </Link>
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 1,
                          backgroundColor: "#f5f5f5",
                          borderRadius: "8px",
                          padding: "8px 16px",
                          maxWidth: "fit-content",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                          "&:hover": {
                            backgroundColor: "#e0e0e0",
                          },
                        }}
                      >
                        <PhoneIcon
                          sx={{ marginRight: "8px", color: "#0077b5" }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ color: "#333", fontWeight: "bold" }}
                        >
                          {theater.phoneNumber}
                        </Typography>
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
                        File Uploaded <CheckCircleOutlineIcon sx={{ ml: 1 }} />
                      </>
                    ) : (
                      "Upload Image"
                    )}
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFileChange}
                    />
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
                  {enableEdit ? "Update Theate" : "Add Theater"}
                </Button>
              </form>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
