"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import InnerPageContainer from "../components/dashboard/common/InnerPageContainer";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  Button,
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    identity: "",
    maritalStatus: "",
    zip: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
  });

  interface CastAndCrewMember {
    id: any;
    name: string;
    profession: string;
    profile_url: string;
    artist_id: string;
    about: string;
  }
  const [formSuccess, setFormSuccess] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [artists, setArtists] = useState<CastAndCrewMember[]>([]);

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  useEffect(() => {
    fetch("http://localhost:8080/artist/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setArtists(data.Cast); // Adjust this based on your actual API response structure
      })
      .catch((error) => {
        console.error("Fetching artists failed:", error);
      });
  }, []);

  const submitForm = (e: any) => {
    e.preventDefault();

    // Create a new FormData object
    const data = new FormData();

    // Append each key-value pair from formData state to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // POST the FormData to the URL of the form
    const formURL = e.target.action;
    fetch(formURL, {
      method: "POST",
      body: data,
      // Do not set the Content-Type header when using FormData
    })
      .then((response) => response.json())
      .then((data) => {
        // Reset the form and handle other states as needed
        setFormData({
          firstName: "",
          lastName: "",
          birthDate: "",
          identity: "",
          maritalStatus: "",
          zip: "",
          phone: "",
          email: "",
          addressLine1: "",
          addressLine2: "",
          landmark: "",
          city: "",
          state: "",
        });
        setFormSuccess(true);
        setIsEditable(false);
      });
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
  });

  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Science Fiction",
    "Horror",
    "Romance",
    "Fantasy",
    "Thriller",
    "Adventure",
    "Mystery",
  ];

  const handleFileChange = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleGenreChange = (event: any) => {
    setSelectedGenres(event.target.value);
  };

  const handleArtistChange = (event: any) => {
    setSelectedArtists(event.target.value);
  };

  return (
    <div
      style={{
        display: "block",
        width: "50%",
        margin: "auto",
        paddingTop: "60px",
      }}
    >
      <form
        method="POST"
        action="https://www.formbackend.com/f/664decaabbf1c319"
        onSubmit={submitForm}
      >
        <InnerPageContainer
          title={`Hi, ${formData.firstName} ${formData.lastName}`}
        >
          <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" gutterBottom>
                  User Image
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "left" }}>
                  <Button
                    sx={{
                      width: 200,
                      marginLeft: 0, // Ensure no left margin
                    }}
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" gutterBottom>
                  {formData.email}
                </Typography>
              </Grid>
            </Grid>

            {isEditable ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            ) : (
              <Button
                type="button"
                onClick={toggleEdit}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Edit details
              </Button>
            )}

            <Box mt={3}>
              <Typography variant="h5" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInput}
                    fullWidth
                    variant="outlined"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInput}
                    fullWidth
                    variant="outlined"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Birth Date"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleInput}
                    fullWidth
                    variant="outlined"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Identity</InputLabel>
                    <Select
                      label="Identity"
                      name="identity"
                      value={formData.identity}
                      onChange={handleInput}
                      disabled={!isEditable}
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Marital Status</InputLabel>
                    <Select
                      label="Marital Status"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInput}
                      disabled={!isEditable}
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Married">Married</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box mt={3}>
              <Typography variant="h5" gutterBottom>
                Contact Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Address"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInput}
                    fullWidth
                    variant="outlined"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mobile Number"
                    name="phone"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={handleInput}
                    fullWidth
                    variant="outlined"
                    disabled={!isEditable}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box mt={3}>
              <Typography variant="h5" gutterBottom>
                Additional Information
              </Typography>
              <Grid container spacing={3}>
                {/* Genre Dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Favorite Genres</InputLabel>
                    <Select
                      multiple
                      value={selectedGenres}
                      onChange={handleGenreChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {genres.map((genre) => (
                        <MenuItem key={genre} value={genre}>
                          {genre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Artist Dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Favorite Artists</InputLabel>
                    <Select
                      multiple
                      value={selectedArtists}
                      onChange={handleArtistChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {artists.map((artist) => (
                        <MenuItem key={artist.name} value={artist.name}>
                          {artist.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </InnerPageContainer>
      </form>
    </div>
  );
}
