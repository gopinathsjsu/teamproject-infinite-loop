'use client'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { Input, Paper, Typography } from '@mui/material';

import React, { ChangeEvent, useState } from "react";
import InnerPageContainer from "@/src/app/components/dashboard/common/InnerPageContainer";
import { any, string } from "zod";
import { getDataFromEndPoint } from "@/src/lib/backend-api";
import { Theme, useTheme } from '@mui/material';
import theme from '../../styles/theme';
import { format } from 'path';


export function MultipleSelectChip() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);
  
    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
}};

export default function Contact() {
    const [formData, setFormData] = useState({
      movieName: "",
      AboutTheMovie: "",
      movieposter: "",
      movieTrailerLink: "",
      Runtime: "",
      genre:[] as string[],
      format: [] as string[],
      endDate: "",
      releaseDate: "",
      cast: "",
      crew: "",
      certificate: "",
      languages: ""
    });

    const genres = ["Action", "Drama", "Comedy", "Science Fiction", "Horror", "Romance", "Fantasy", "Thriller", "Adventure", "Mystery"];
    const formats = ["IMAX", "IMAX 70mm", "XD", "SD"]; 

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


    function getStyles(name: string, personName: readonly string[], theme: Theme) {
            return {
            fontWeight:
                personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
            };
        }


    const languageOptions = [
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
    const [formSuccess, setFormSuccess] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [formSuccessMessage, setFormSuccessMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleInput = (e: any) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setFormData((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
    };
  
  
  
    const handleGenreChange = (event: SelectChangeEvent<string[]>) => {
        const {
          target: { value },
        } = event;
        // 'value' will be of type string[] if the Select component is set to multiple
        setFormData((prevFormData) => ({
          ...prevFormData,
          genre: value as string[], // Ensure the value is treated as string[]
        }));
      };
  
    const toggleEdit = () => {
      setIsEditable(!isEditable);
    };
  
  
    const submitForm = (e: any) => {
      e.preventDefault();
    
      const data = new FormData();
    
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "genre" || key === "format") {
            // Join the array values into a single string with comma separation
            data.append(key, value.join(', '));
          } else {
            // Append non-array and other array values normally
            data.append(key, value as string | Blob);
          }
        });
    
      // If there's a file selected, append it to FormData
      if (selectedFile) {
        data.append("movieposter", selectedFile);
      }
    
      // POST the FormData to the URL of the form
      const formURL = e.currentTarget.action; // Use currentTarget for form's action
      fetch(formURL, {
        method: "POST",
        body: data,
        // Do not set the Content-Type header when using FormData
      })
      .then(response => response.json())
      .then(data => {
        // Handle form submission success
        setFormSuccess(true);
        setIsEditable(false);
        setFormSuccessMessage("Movie added successfully!"); // Optional: Set a success message
        setFormData({ 
          // Reset formData to initial state
          movieName: "",
          AboutTheMovie: "",
          movieposter: "",
          movieTrailerLink: "",
          Runtime: "",
          genre: [] ,
          format: [],
          endDate: "",
          releaseDate: "",
          cast: "",
          crew: "",
          certificate: "",
          languages: ""
        });
      }).catch(error => {
        // Handle errors if any
        console.error("Error submitting form:", error);
      });
    };
    
    

    const handleFormatChange = (event: SelectChangeEvent<string[]>) => {
        const {
          target: { value },
        } = event;
        // 'value' will be of type string[] if the Select component is set to multiple
        setFormData((prevFormData) => ({
          ...prevFormData,
          format: value as string[], // Ensure the value is treated as string[]
        }));
      };
  
  const handleFileUpload = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file); // This should be the state updater function from useState
    }
  };
  
  const handleFileChange = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  
  return (
    <div style={{ display: 'block', width: '50%', margin: 'auto', paddingTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', marginBottom: '30px' }}>
        <Typography
          variant="h4"
          component="h1"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#333', // Dark gray color
            textTransform: 'uppercase',
            borderBottom: '2px solid #0073e6', // Blue underline
            padding: '10px 0',
            textAlign: 'center',
            letterSpacing: '2px', // Add letter spacing
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow
          }}
        >
          Add Movies
        </Typography>
      </Paper>
      <form method="POST" action="movie/add" onSubmit={submitForm}>
        <Box
          component="div"
          sx={{
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '1px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Box shadow
          }}
        >
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <TextField
                    label="Movie Name"
                    variant="outlined"
                    fullWidth
                    name="movieName"
                    placeholder="Movie Name"
                    onChange={handleInput}
                    value={formData.movieName}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <TextField
                    label="About the Movie"
                    variant="outlined"
                    fullWidth
                    name="AboutTheMovie"
                    placeholder="About the Movie"
                    onChange={handleInput}
                    value={formData.AboutTheMovie}
                  />
                </div>
              </div>
              <div>
                <InputLabel htmlFor="end-date" shrink>
                  Movie Poster
                </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="movieposter"
                  type="file"
                  onChange={handleInput}
                />
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <TextField
                    label="Movie Trailer Link"
                    variant="outlined"
                    fullWidth
                    name="movieTrailerLink"
                    onChange={handleInput}
                    value={formData.movieTrailerLink}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <TextField
                    label="Runtime"
                    variant="outlined"
                    fullWidth
                    name="Runtime"
                    placeholder="Runtime"
                    onChange={handleInput}
                    value={formData.Runtime}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            {/* Genres and Format side by side */}
            <div style={{ display: 'flex', gap: '16px' }}>
              {/* Genre Selection */}
              <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-chip-label">Select Genres</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={formData.genre}
                    onChange={handleGenreChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Select Genres" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {genres.map((genre) => (
                      <MenuItem
                        key={genre}
                        value={genre}
                        style={getStyles(genre, formData.genre, theme)}
                      >
                        {genre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* Format Selection */}
              <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="format-multiple-chip-label">Select Format</InputLabel>
                  <Select
                    labelId="format-multiple-chip-label"
                    id="format-multiple-chip"
                    multiple
                    value={formData.format}
                    onChange={handleFormatChange}
                    input={<OutlinedInput id="select-multiple-chip-format" label="Select Format" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {formats.map((format) => (
                      <MenuItem
                        key={format}
                        value={format}
                        style={getStyles(format, formData.format, theme)}
                      >
                        {format}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* End Date and Release Date side by side */}
            <div style={{ display: 'flex', gap: '16px' }}>
              {/* Date Pickers */}
              <div>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="end-date" shrink>
                    End Date
                  </InputLabel>
                  <Input
                    id="end-date"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInput}
                  />
                </FormControl>
              </div>

              <div>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="Release-date" shrink>
                    Release Date
                  </InputLabel>
                  <Input
                    id="Release-date"
                    type="date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleInput}
                  />
                </FormControl>
              </div>
            </div>

            {/* Cast and Crew side by side */}
            <div style={{ display: 'flex', gap: '16px' }}>
              {/* Cast Input */}
              <div>
                <TextField
                  label="Cast"
                  variant="outlined"
                  fullWidth
                  name="cast"
                  placeholder="Cast"
                  onChange={handleInput}
                  value={formData.cast}
                />
              </div>

              {/* Crew Input */}
              <div>
                <TextField
                  label="Crew"
                  variant="outlined"
                  fullWidth
                  name="crew"
                  placeholder="Crew"
                  onChange={handleInput}
                  value={formData.crew}
                />
              </div>
            </div>

            {/* Certificate and Language side by side */}
            <div style={{ display: 'flex', gap: '16px' }}>
              {/* Certificate Dropdown */}
              <div>
                <FormControl variant="outlined" fullWidth style={{ width: '200px' }}>
                  <InputLabel>Certificate</InputLabel>
                  <Select
                    label="Certificate"
                    value={formData.certificate}
                    onChange={handleInput}
                    name="certificate"
                  >
                    <MenuItem value="U">U</MenuItem>
                    <MenuItem value="U/A">U/A</MenuItem>
                    <MenuItem value="A">A</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Languages Dropdown */}
              <div>
                <TextField
                  select
                  value={formData.languages}
                  onChange={handleInput}
                  variant="outlined"
                  fullWidth
                  name="languages"
                  SelectProps={{
                    native: true,
                  }}
                >
                  {languageOptions.map((language, index) => (
                    <option key={index} value={language}>
                      {language}
                    </option>
                  ))}
                </TextField>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
}

