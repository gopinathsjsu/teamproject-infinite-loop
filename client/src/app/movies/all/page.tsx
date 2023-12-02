// Import necessary libraries and components
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useStore from "@/src/store";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  MenuItem,
  Select,
  styled,
  SelectChangeEvent,
} from "@mui/material";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDataFromEndPoint } from "@/src/lib/backend-api";

// StyledSelect component for styling the Select component
const StyledSelect = styled(Select)({
  margin: "8px",
  minWidth: "120px",
});

// MovieCard component for displaying individual movie card
const MovieCard = ({
  movie,
  onImageClick,
}: {
  movie: any;
  onImageClick: any;
}) => {
  const router = useRouter();
  const store: any = useStore();
  const isAdmin = store.isAdmin; // Replace with the actual way to get this info

  // Function to handle editing a movie
  const editMovie = (movieId: string) => {
    router.push(`/movies/${movieId}/edit`);
  };

  // Function to handle deleting a movie
  async function deleteMovie(movieId: any) {
    const formURL = "movie/deleteMovie";
    const data = { id: movieId };

    const response = await getDataFromEndPoint(data, formURL, "POST");
    if (response != null) {
      router.refresh();
    }
  }

  return (
    <Card sx={{ width: 200, height: 400, m: 1, boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{
          width: 200,
          height: 300,
          objectFit: "cover",
          cursor: "pointer",
        }}
        image={movie.banner_url}
        alt={movie.title}
        onClick={() => onImageClick(movie.id)}
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle2" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.format}
        </Typography>
        {isAdmin && (
          <Button
            startIcon={<EditIcon />}
            onClick={() => {
              editMovie(movie.id);
            }}
          />
        )}
        {isAdmin && (
          <Button
            startIcon={<DeleteIcon />}
            onClick={() => {
              deleteMovie(movie.id);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

// Interface for movie object
interface movie {
  title: string;
  description: string;
  movie_url: string;
  movie_trailer_url: string;
  run_time: string;
  genres: string[];
  format: string[];
  end_date: string;
  release_date: string;
  cast: string;
  crew: string;
  certificate: string;
  languages: string;
}

// MovieSlider component for displaying a slider of movies
const MovieSlider = () => {
  // State variables
  const [movies, setMovies] = useState<movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [selectedFormat, setSelectedFormat] = useState<string>("All");

  // Arrays for genres, languages, and formats
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
  const formats = ["SD", "3D", "4DX", "IMAX 70mm"];

  // Fetch movies data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("http://localhost:8080/movie/all");
        const response = await getDataFromEndPoint("", `movie/all`, "GET");
        const tempMovies = response.movies.map((movie: any) => {
          movie["genres"] = movie["genres"][0].split(",  ");
          return movie;
        });
        setMovies(tempMovies);
        setFilteredMovies(tempMovies);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Update filtered movies when filters change
  useEffect(() => {
    const filtered = movies.filter(
      (movie) =>
        (selectedGenre === "" ||
          (movie.genres && movie.genres.includes(selectedGenre))) &&
        (selectedLanguage === "All"
          ? true
          : movie.languages.includes(selectedLanguage)) &&
        (selectedFormat === "All"
          ? true
          : movie.format.includes(selectedFormat))
    );
    setFilteredMovies(filtered);
  }, [selectedLanguage, selectedFormat, movies]);

  // Router and store variables
  const router = useRouter();
  const store: any = useStore();
  const isAdmin = store.isAdmin; // Replace with the actual way to get this info

  // Function to handle clicking on a movie card
  const handleCardClick = (movieid: string) => {
    console.log(`Clicked on ${movieid}`);
    router.push(`/movies/${movieid}`);
  };

  // Function to handle clicking on the "Add Movie" button
  const handleAddMovieClick = () => {
    router.push("/movies/add");
  };

  // Function to handle genre filter change
  const handleGenreChange = (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ) => {
    setSelectedGenre(event.target.value as string);
  };

  // Function to handle language filter change
  const handleLanguageChange = (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ) => {
    setSelectedLanguage(event.target.value as string);
  };

  // Function to handle format filter change
  const handleFormatChange = (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ) => {
    setSelectedFormat(event.target.value as string);
  };

  // Render the component
  return (
    <Container maxWidth={false} sx={{ my: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recommended Movies
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            sx={{ paddingLeft: 2, mb: 2 }}
            onClick={handleAddMovieClick}
          >
            Add Movie
          </Button>
        )}
        <Box sx={{ display: "flex" }}>
          {/* <StyledSelect
            value={selectedGenre}
            onChange={handleGenreChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Genre
            </MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </StyledSelect> */}
          <StyledSelect
            value={selectedLanguage}
            onChange={handleLanguageChange}
            displayEmpty
          >
            <MenuItem value="All">All Languages</MenuItem>
            {languages.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </StyledSelect>

          <StyledSelect
            value={selectedFormat}
            onChange={handleFormatChange}
            displayEmpty
          >
            <MenuItem value="All">All Formats</MenuItem>
            {formats.map((format) => (
              <MenuItem key={format} value={format}>
                {format}
              </MenuItem>
            ))}
          </StyledSelect>
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ justifyContent: "start" }}>
        {filteredMovies.map((movie, index) => (
          <Grid item key={index} sx={{ width: "20%", flexGrow: 1 }}>
            <MovieCard movie={movie} onImageClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Export the component
export default MovieSlider;
