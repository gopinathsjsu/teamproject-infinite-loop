'use client'
import React, { ChangeEvent, useEffect, useState } from "react";
import InnerPageContainer from "../components/dashboard/common/InnerPageContainer";
import { styled, } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import type { CastAndCrewMember } from '../artist/all/page';
import { Avatar, IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Ensure this import is at the top of your file


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
    email: "",
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    confirmPassword: "",
    address1: "",
    address2: "",
    city: "",
    stateProvinceRegion: "",
    country: "",
    zipPostalCode: "",
    // genres: "",
    // favoriteCast: "",
    // favoriteCrew: "",
    // preferredLanguages: ""
    genres: [] as string[],
    favoriteCast: [] as string[],
    favoriteCrew: [] as string[],
    preferredLanguages: [] as string[],
  });
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
    fetch('http://localhost:8080/artist/all')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setArtists(data.Cast); // Adjust this based on your actual API response structure
      })
      .catch(error => {
        console.error('Fetching artists failed:', error);
      });
  }, []);
  
  const submitForm = (e:any) => {
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
    }).then((response) => response.json())
    .then((data) => {
        // Reset the form and handle other states as needed
        setFormData({ 
          email: "",
          fullName: "",
          phoneNumber: "",
          dateOfBirth: "",
          gender: "",
          password: "",
          confirmPassword: "",
          address1: "",
          address2: "",
          city: "",
          stateProvinceRegion: "",
          country: "",
          zipPostalCode: "",
          // genres: "",
          // favoriteCast: "",
          // favoriteCrew: "",
          // preferredLanguages: ""
          genres: [] as string[],
          favoriteCast: [] as string[],
          favoriteCrew: [] as string[],
          preferredLanguages: [] as string[],
        });
        setFormSuccess(true);
        setIsEditable(false);
    });
}
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
});

const genres = [
  "Action", "Drama", "Comedy", "Science Fiction", "Horror",
  "Romance", "Fantasy", "Thriller", "Adventure", "Mystery"
];



const handleFileChange = (e: any) => {
  e.preventDefault();
  const file = e.target.files[0];
  setSelectedFile(file);
};

const handleGenreChange = (event:any) => {
  setSelectedGenres(event.target.value);
};

const handleArtistChange = (event:any) => {
  setSelectedArtists(event.target.value);
};

return (
  <div style={{ display: 'block', width: '60%', margin: 'auto', paddingTop: '60px' }}>
    <form
      method="POST"
      action="https://www.formbackend.com/f/664decaabbf1c319"
      onSubmit={submitForm}
    >
      <InnerPageContainer title={`Hi, ${formData.fullName}`}>
        <Paper elevation={3} sx={{ padding: 5, marginBottom: 3 }}>
      <Grid container spacing={3} justifyContent="flex-start"> {/* Add justifyContent */}

            {/* ... (other fields) */}
                        {/* Edit/Submit Button */}
            <Grid container justifyContent="flex-end" spacing={2}>
  {/* Conditionally render the Submit button only if isEditable is true */}
              {/* Always render the Edit button, but only make it clickable if isEditable is false */}
              <Grid item>
                <IconButton
                  onClick={toggleEdit}
                  color="primary"
                  sx={{ mt: 2 }}
                  disabled={isEditable} // Disable if the form is already in edit mode
                >
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>
            {/* Personal Details */}
            <Typography variant="h6" gutterBottom component="div" paddingTop={0}>
              Personal Details
            </Typography>

            {/* Email ID */}
            <Grid item xs={12}>
              <TextField
                label="Email ID"
                name="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={handleInput}
                fullWidth
                variant="outlined"
                disabled={!isEditable}
              />
            </Grid>

            {/* Full Name */}
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInput}
                fullWidth
                variant="outlined"
                disabled={!isEditable}
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInput}
                fullWidth
                variant="outlined"
                disabled={!isEditable}
              />
            </Grid>

            {/* Date of Birth */}
            <Grid item xs={12}>
              <TextField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInput}
                fullWidth
                variant="outlined"
                disabled={!isEditable}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Gender */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Gender</InputLabel>
                <Select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInput}
                  disabled={!isEditable}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInput}
                fullWidth
                variant="outlined"
                disabled={!isEditable}
              />
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInput}
                fullWidth
                variant="outlined"
                disabled={!isEditable}
              />
            </Grid>

            {/* Address Details */}
            <Typography variant="h6" gutterBottom component="div" paddingTop={4}>
              Address Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Address 1"
                  name="address1"
                  placeholder="Address1"
                  value={formData.address1}
                  onChange={handleInput}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Address 2"
                  name="address2"
                  placeholder="Address line 2"
                  value={formData.address2}
                  onChange={handleInput}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInput}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="State / Province / Region"
                  name="stateProvinceRegion"
                  placeholder="State / Province / Region"
                  value={formData.stateProvinceRegion}
                  onChange={handleInput}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Zip / Postal Code"
                  name="zipPostalCode"
                  placeholder="Zip / Postal code"
                  value={formData.zipPostalCode}
                  onChange={handleInput}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Country"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInput}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                />
              </Grid>
            </Grid>

            {/* Additional Details */}
            <Typography variant="h6" gutterBottom component="div" paddingTop={4}>
              Additional Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Genres</InputLabel>
                  <Select
                    multiple
                    name="genres"
                    value={formData.genres}
                    onChange={handleInput}
                    renderValue={(selected) => selected.join(', ')}
                    disabled={!isEditable}
                  >
                    {genres.map((genre) => (
                      <MenuItem key={genre} value={genre}>
                        {genre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Favorite Cast</InputLabel>
                  <Select
                    multiple
                    name="favoriteCast"
                    value={formData.favoriteCast}
                    onChange={handleInput}
                    renderValue={(selected) => selected.join(', ')}
                    disabled={!isEditable}
                  >
                    {artists.map((artist) => (
                      <MenuItem key={artist.name} value={artist.name}>
                        {artist.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Favorite Crew</InputLabel>
                  <Select
                    multiple
                    name="favoriteCrew"
                    value={formData.favoriteCrew}
                    onChange={handleInput}
                    renderValue={(selected) => selected.join(', ')}
                    disabled={!isEditable}
                  >
                    {artists.map((artist) => (
                      <MenuItem key={artist.name} value={artist.name}>
                        {artist.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Preferred Languages</InputLabel>
                  <Select
                    multiple
                    name="preferredLanguages"
                    value={formData.preferredLanguages}
                    onChange={handleInput}
                    renderValue={(selected) => selected.join(', ')}
                    disabled={!isEditable}
                  >
                    {/* Replace with actual language options */}
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Spanish">Spanish</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                    {/* ... other languages ... */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {isEditable && (
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </Button>
                </Grid>
              )}
          </Grid>
        </Paper>
      </InnerPageContainer>
    </form>
  </div>
);
}