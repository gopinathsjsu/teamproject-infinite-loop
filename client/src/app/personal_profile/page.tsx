'use client'
import React, { useEffect, useState } from "react";
import InnerPageContainer from "../components/dashboard/common/InnerPageContainer";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormHelperText, Paper } from "@mui/material";
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Script from "next/script";

const profileSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  fullName: zod.string().min(1, { message: "Full name is required" }),
  phoneNumber: zod.string().min(10, { message: "Invalid phone number" }),
  dateOfBirth: zod.date(),
  gender: zod.string().min(1, { message: "Gender is required" }),
  address1: zod.string().min(1, { message: "Address1 is required" }),
  address2: zod.string().optional(),
  city: zod.string().min(1, { message: "City is required" }),
  state: zod.string().min(1, { message: "State is required" }),
  country: zod.string().min(1, { message: "Country is required" }),
  zipCode: zod.string().min(1, { message: "Zip Code is required" }),
  genres: zod.array(zod.string()).nonempty('Select atleast one genre'),
  favoriteCast: zod.array(zod.string()).nonempty('Select atleast one artist'),
  favoriteCrew: zod.array(zod.string()).nonempty('Select atleast one crew'),
  preferredLanguages: zod.array(zod.string()).nonempty('Select atleast one language'),
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

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Mandarin Chinese",
  "Hindi",
  "Japanese",
  "Korean",
  "Italian",
  "Russian",
  "Portuguese",
  "Arabic",
  "Turkish",
  "Persian",
  "Swedish",
  "Danish",
  "Norwegian",
  "Finnish",
  "Dutch",
  "Greek",
  "Polish",
  "Hungarian",
  "Czech",
  "Thai",
  "Hebrew",
  "Tamil",
  "Telugu",
  "Bengali",
];

export default function Profile() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [address, setAddress] = React.useState('');
  const [castData, setCastData] = useState<any>([]);
  const [crewData, setCrewData] = useState<any>([]);

  const { register, control, formState: { errors }, getValues, trigger, setValue } = useForm({
    resolver: zodResolver(profileSchema)
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/artist/all");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setCrewData(data.Crew);
        setCastData(data.Cast);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();

  }, []);

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const addressComponents = results[0].address_components;

    const getAddressComponent = (type: string) => {
      return addressComponents.find(component => component.types.includes(type))?.long_name || '';
    };
    const street = getAddressComponent('route');
    const streetNumber = getAddressComponent('street_number');
    const formattedAddress1 = `${streetNumber} ${street}`;

    setAddress(formattedAddress1);
    setValue('address1', formattedAddress1);
    setValue('city', getAddressComponent('locality'));
    setValue('state', getAddressComponent('administrative_area_level_1'));
    setValue('country', getAddressComponent('country'));
    setValue('zipCode', getAddressComponent('postal_code'));
  };

  const getErrorMessage = (error: any) => {
    return error && typeof error.message === 'string' ? error.message : '';
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
    }
  };

  return (
    <div style={{ display: 'block', width: '50%', margin: 'auto', paddingTop: '60px' }}>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAH_4KikoUaqV41Fq09gBEsXzADYU1xM8w&libraries=places`}
        strategy="beforeInteractive"
      />
      <form>
        <InnerPageContainer title='Hi..'>
          <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
            <form>
              <Typography variant="h6" gutterBottom>
                Personal Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar
                      sx={{ width: 100, height: 100 }}
                      src={selectedFile ? URL.createObjectURL(selectedFile) : "/broken-image.jpg"}
                    />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                    <Button
                      sx={{ width: 200 }}
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                      />
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register("email")}
                    error={Boolean(errors.email)}
                    helperText={getErrorMessage(errors.email)}
                    id="email"
                    name="email"
                    label="Email ID"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register("fullName")}
                    error={Boolean(errors.fullName)}
                    helperText={getErrorMessage(errors.fullName)}
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register("phoneNumber")}
                    error={Boolean(errors.phoneNumber)}
                    helperText={getErrorMessage(errors.phoneNumber)}
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label="Date of Birth"
                          {...field}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Controller
                      name="gender"
                      control={control}
                      defaultValue=""
                      render={({ field }) => {
                        console.log('Gender Controller Re-rendered');
                        return (
                          <Select
                            {...field}
                            labelId="gender-label"
                            label="Gender"
                            variant="standard"
                            error={Boolean(errors.gender)}
                          >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                          </Select>
                        );
                      }}
                    />
                    <Typography variant="inherit" color="textSecondary">
                      {getErrorMessage(errors.gender)}
                    </Typography>
                  </FormControl>
                </Grid>
              </Grid>
              <Typography sx={{ mt: 5 }} variant="h6" gutterBottom>
                Address Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <Box>
                        <TextField
                          {...getInputProps({
                            label: 'Address1',
                          })}
                          variant="standard"
                          fullWidth
                          error={Boolean(errors.address1)}
                          helperText={getErrorMessage(errors.address1)}
                        />
                        {loading && <div>Loading...</div>}
                        <List sx={{ position: 'absolute', zIndex: 1, width: '100%' }}>
                          {suggestions.map(suggestion => (
                            <ListItem {...getSuggestionItemProps(suggestion)} sx={{ backgroundColor: suggestion.active ? '#b9d2fa' : '#ffffff', cursor: 'pointer' }} key={suggestion.placeId}>
                              {suggestion.description}
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </PlacesAutocomplete>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register("address2")}
                    error={Boolean(errors.address2)}
                    helperText={getErrorMessage(errors.address2)}
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.city)}
                        helperText={getErrorMessage(errors.city)}
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        variant="standard"
                        InputLabelProps={{
                          shrink: Boolean(field.value),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.state)}
                        helperText={getErrorMessage(errors.state)}
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                        InputLabelProps={{
                          shrink: Boolean(field.value),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.country)}
                        helperText={getErrorMessage(errors.country)}
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        variant="standard"
                        InputLabelProps={{
                          shrink: Boolean(field.value),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="zipCode"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.zipCode)}
                        helperText={getErrorMessage(errors.zipCode)}
                        id="zipCode"
                        name="zipCode"
                        label="Zip / Postal code"
                        fullWidth
                        variant="standard"
                        InputLabelProps={{
                          shrink: Boolean(field.value),
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Typography sx={{mt:5}} variant="h6" gutterBottom>
                Additional Details
              </Typography>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="genres">Genres</InputLabel>
                <Controller
                  name="genres"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <div>
                      <Select
                        multiple
                        value={field.value}
                        fullWidth
                        onChange={(e) => field.onChange(e.target.value)}
                        error={!!errors.genres}
                        label="Genres"
                      >
                        {genres.map((genre) => (
                          <MenuItem key={genre} value={genre}>
                            {genre}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error={!!errors.genres}>{getErrorMessage(errors.genres)}</FormHelperText>
                    </div>
                  )}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="favoriteCast">Favorite Cast</InputLabel>
                <Controller
                  name="favoriteCast"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <div>
                      <Select
                        multiple
                        value={field.value}
                        fullWidth
                        onChange={(e) => field.onChange(e.target.value)}
                        error={!!errors.favoriteCast}
                        label="Favorite Casr"
                      >
                        {castData.map((cast: any) => (
                          <MenuItem key={cast.id} value={cast.id}>
                            {cast.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error={!!errors.favoriteCast}>
                        {getErrorMessage(errors.favoriteCast)}
                      </FormHelperText>
                    </div>
                  )}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="favoriteCrew">Favorite Crew</InputLabel>
                <Controller
                  name="favoriteCrew"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <div>
                      <Select
                        multiple
                        value={field.value}
                        fullWidth
                        onChange={(e) => field.onChange(e.target.value)}
                        error={!!errors.favoriteCrew}
                        label="Favorite Crew"
                      >
                        {crewData.map((crew: any) => (
                          <MenuItem key={crew.id} value={crew.id}>
                            {crew.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error={!!errors.favoriteCrew}>
                        {getErrorMessage(errors.favoriteCrew)}
                      </FormHelperText>
                    </div>
                  )}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="preferredLanguages">Preferred Languages</InputLabel>
                <Controller
                  name="preferredLanguages"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <div>
                      <Select
                        multiple
                        value={field.value}
                        fullWidth
                        onChange={(e) => field.onChange(e.target.value)}
                        error={!!errors.preferredLanguages}
                        label="Preferred Languages"
                      >
                        {languages.map((language) => (
                          <MenuItem key={language} value={language}>
                            {language}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error={!!errors.preferredLanguages}>
                        {getErrorMessage(errors.preferredLanguages)}
                      </FormHelperText>
                    </div>
                  )}
                />
              </FormControl>
            </form>
          </Paper>
        </InnerPageContainer>
      </form>
    </div>
  );
}
