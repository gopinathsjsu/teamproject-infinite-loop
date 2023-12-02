"use client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { Avatar, Input, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDataFromEndPoint } from "@/src/lib/backend-api";
import { Theme } from "@mui/material";
import theme from "../../../styles/theme";
import Autocomplete from "@mui/material/Autocomplete";
import { useParams, useRouter } from "next/navigation";

export default function EditMovie() {
  const { movieName }: { movieName: string } = useParams();
  interface CastMember {
    id: string;
    name: string;
    profile_url: string;
  }

  interface CrewMember {
    id: string;
    name: string;
    profile_url: string;
  }

  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [selectedCast, setSelectedCast] = useState<CastMember[]>([]);
  const [selectedCrew, setSelectedCrew] = useState<CrewMember[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

  const [formData, setFormData] = useState({
    movieName: "",
    AboutTheMovie: "",
    movieTrailerLink: "",
    Runtime: "",
    genre: [] as string[],
    format: [] as string[],
    endDate: "",
    releaseDate: "",
    cast: "",
    crew: "",
    certificate: "",
    languages: "",
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // const response = await fetch(`http://localhost:8080/movie/${movieName}`);
        const data = await getDataFromEndPoint("", `movie/${movieName}`, "GET");
        // if (!response.ok) {
        //     throw new Error(`Error: ${response.status}`);
        // }
        // const data = await response.json();
        setFormData(() => ({
          movieName: data.movie.title,
          AboutTheMovie: data.movie.description,
          movieTrailerLink: data.movie.trailer_url,
          Runtime: data.movie.run_time,
          genre: data.movie.genres[0].split(","),
          format: data.movie.format.split(","),
          endDate: data.movie.end_date.split("T")[0],
          releaseDate: data.movie.release_date.split("T")[0],
          cast: "",
          crew: "",
          certificate: data.movie.certificate,
          languages: data.movie.languages[0],
        }));
        setSelectedCast(
          data.cast.map((castMember: any) => ({
            id: castMember.id,
            name: castMember.name,
            description: castMember.description,
            profession: castMember.profession,
            profile_url: castMember.profile_url,
          }))
        );

        setSelectedCrew(
          data.crew.map((crewMember: any) => ({
            id: crewMember.id,
            name: crewMember.name,
            description: crewMember.description,
            profession: crewMember.profession,
            profile_url: crewMember.profile_url,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const fetchArtsitData = async () => {
      try {
        // const response = await fetch("http://localhost:8080/artist/all");
        const data = await getDataFromEndPoint("", `artist/all`, "GET");
        // if (!response.ok) {
        //     throw new Error(`Error: ${response.status}`);
        // }
        // const data = await response.json();
        setCrew(data.Crew);
        setCast(data.Cast);
        fetchMovie();
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchArtsitData();
  }, []);

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
  const formats = ["IMAX 70mm", "4DX", "3D", "SD"];

  const router = useRouter();

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

  function getStyles(
    name: string,
    personName: readonly string[],
    theme: Theme
  ) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const languageOptions = [
    "Select a language",
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

  const handleInput = (e: any) => {
    console.log(e.target);
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log(files);
      const selectedFilesArray: File[] = Array.from(files);
      setSelectedFiles(selectedFilesArray); // Update the state
    }
  };

  const handleGenreChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setFormData((prevFormData) => ({
      ...prevFormData,
      genre: value as string[],
    }));
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    console.log(formData);
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "genre" || key === "format") {
        data.append(key, (value as string[]).join(", "));
      } else {
        data.append(key, value as string | Blob);
      }
    });
    if (selectedFiles) {
      selectedFiles.forEach((file, index) => {
        data.append(`movieposter`, file);
      });
    }
    data.append("castIds", selectedCast.map((artist) => artist.id).join(","));
    console.log(selectedCrew);
    data.append("crewIds", selectedCrew.map((artist) => artist.id).join(","));
    data.append("id", movieName);
    const formURL = "movie/updateMovie";
    const response = await getDataFromEndPoint(data, formURL, "POST");
    if (response != null) {
      router.push("/movie/all");
    }
  };

  const handleFormatChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setFormData((prevFormData) => ({
      ...prevFormData,
      format: value as string[],
    }));
  };

  return (
    <div
      style={{
        display: "block",
        width: "50%",
        margin: "auto",
        paddingTop: "100px",
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: "2px", textAlign: "center", marginBottom: "30px" }}
      >
        <Typography
          variant="h4"
          component="h1"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "36px",
            fontWeight: "bold",
            color: "#333", // Dark gray color
            textTransform: "uppercase",
            borderBottom: "2px solid #0073e6", // Blue underline
            padding: "10px 0",
            textAlign: "center",
            letterSpacing: "2px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Subtle shadow
          }}
        >
          Update Movie
        </Typography>
      </Paper>
      <form method="POST" onSubmit={submitForm}>
        <Box
          component="div"
          sx={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "1px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Box shadow
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", gap: "20px" }}>
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
                  onChange={handleFileChange}
                  inputProps={{ multiple: true }}
                />
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
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

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}
          >
            {/* Genres and Format side by side */}
            <div style={{ display: "flex", gap: "16px" }}>
              {/* Genre Selection */}
              <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-chip-label">
                    Select Genres
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={formData.genre}
                    onChange={handleGenreChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Select Genres"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {genres.map((genre, index) => (
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
                  <InputLabel id="format-multiple-chip-label">
                    Select Format
                  </InputLabel>
                  <Select
                    labelId="format-multiple-chip-label"
                    id="format-multiple-chip"
                    multiple
                    value={formData.format}
                    onChange={handleFormatChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip-format"
                        label="Select Format"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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
            <div style={{ display: "flex", gap: "16px" }}>
              {/* Date Pickers */}

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
            </div>
            <div>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={cast}
                getOptionLabel={(option) => option.name || ""}
                value={selectedCast}
                onChange={(event, newValue) => {
                  setSelectedCast(newValue);
                }}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Avatar
                      key={option.name}
                      src={option.profile_url}
                      alt={option.name}
                      sx={{
                        width: 30,
                        height: 30,
                        marginRight: 1,
                      }}
                    />
                    {option.name}
                  </Box>
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Box
                      {...getTagProps({ index })}
                      component="div"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      key={index}
                    >
                      <img
                        src={option.profile_url}
                        alt={option.name}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                      />
                      {option.name}
                    </Box>
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Movie Cast"
                    placeholder="Cast"
                  />
                )}
              />
            </div>
            <div>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={crew}
                getOptionLabel={(option) => option.name || ""}
                value={selectedCrew}
                onChange={(event, newValue) => {
                  setSelectedCrew(newValue);
                }}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Avatar
                      key={option.name}
                      src={option.profile_url}
                      alt={option.name}
                      sx={{
                        width: 30,
                        height: 30,
                        marginRight: 1,
                      }}
                    />
                    {option.name}
                  </Box>
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Box
                      {...getTagProps({ index })}
                      component="div"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      key={index}
                    >
                      <img
                        src={option.profile_url}
                        alt={option.name}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                      />
                      {option.name}
                    </Box>
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Movie Crew"
                    placeholder="Crew"
                  />
                )}
              />
            </div>

            {/* Certificate and Language side by side */}
            <div style={{ display: "flex", gap: "16px" }}>
              {/* Certificate Dropdown */}
              <div>
                <FormControl
                  variant="outlined"
                  fullWidth
                  style={{ width: "200px" }}
                >
                  <InputLabel>Certificate</InputLabel>
                  <Select
                    label="Certificate"
                    value={formData.certificate}
                    onChange={handleInput}
                    name="certificate"
                  >
                    <MenuItem key="U" value="U">
                      U
                    </MenuItem>
                    <MenuItem key="U/A" value="U/A">
                      U/A
                    </MenuItem>
                    <MenuItem key="A" value="A">
                      A
                    </MenuItem>
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
