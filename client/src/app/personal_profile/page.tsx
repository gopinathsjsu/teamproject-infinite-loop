'use client'
import React, { ChangeEvent, useState } from "react";
import InnerPageContainer from "../components/dashboard/common/InnerPageContainer";
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
    state: ""
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  
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
            state: ""
        });
        setFormSuccess(true);
        setIsEditable(false);
    });
}


const handleFileChange = (e: any) => {
  e.preventDefault();
  const file = e.target.files[0];
  setSelectedFile(file);
};

return (
  <div style={{ display: 'block', width: '50%', margin: 'auto', paddingTop: '20px' }}>
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
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
              />
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
              Address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Area Pincode"
                  name="zip"
                  placeholder="Area Pincode"
                  value={formData.zip}
                  onChange={handleInput}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address Line 1"
                  name="addressLine1"
                  placeholder="Address Line 1"
                  value={formData.addressLine1}
                  onChange={handleInput}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address Line 2"
                  name="addressLine2"
                  placeholder="Address Line 2"
                  value={formData.addressLine2}
                  onChange={handleInput}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Landmark"
                  name="landmark"
                  placeholder="Landmark"
                  value={formData.landmark}
                  onChange={handleInput}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Town / City"
                  name="city"
                  placeholder="Town / City"
                  value={formData.city}
                  onChange={handleInput}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="State"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInput}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </InnerPageContainer>
    </form>
  </div>
);
}
