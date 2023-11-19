"use client";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";


const MovieCard = ({
  movie,
  onImageClick,
}: {
  movie: any;
  onImageClick: any;
}) => {
  return (
    <Card sx={{ width: 200, height: 360, m: 1, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="250"
        image={movie.movie_url}
        alt={movie.title}
        // onClick={() => onImageClick(movie.movieTitle)} // Click handler is now on the image
        sx={{ cursor: "pointer" }} // Add a pointer cursor on hover
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.description}
        </Typography>
      </CardContent>
    </Card>
  );
};



interface movie {
  title: string;
  description: string;
  movie_url: string;
  movie_trailer_url: string;
  run_time: string;
  genre: string[];
  format: string[];
  end_date: string;
  release_date: string;
  cast: string;
  crew: string;
  certificate: string;
  languages: string;
}


const MovieSlider = () => {
     const [movies, setMovie] = useState<movie[]>([]); // Initialize form data with empty strings
     useEffect(() => {
       const fetchData = async () => {
         try {
           const response = await fetch("http://localhost:8080/movies/all");
           if (!response.ok) {
             throw new Error(`Error: ${response.status}`);
           }
           const data = await response.json();
           setMovie(data.movies);
           console.log(data);
         } catch (error) {
           console.error("Failed to fetch data:", error);
         }
       };

       fetchData();
     }, []);
     const [selectedFile, setSelectedFile] = useState(null);
     
//   const navigate = useNavigate(); // Call useNavigate at the top level of your component

//   const handleAddMovieClick = () => {
//     navigate("/movies/add"); // Use navigate function to change the route
//   };

  const handleCardClick = (movieName: string) => {
    console.log(`Clicked on ${movieName}`);
    // Implement your own logic here, such as navigation
  };

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Recommended Movies
      </Typography>
      <Button
        variant="contained"
        sx={{ paddingLeft: 2 }}
        color="error" // Use the 'error' color from the theme for a red button
       // onClick={handleAddMovieClick}
      >
        Add Movie
      </Button>
      <Grid container spacing={2} sx={{ justifyContent: "start" }}>
        {" "}
        {/* Ensure items are left-aligned */}
        {movies.map((movie, index) => (
          <Grid item key={index} sx={{ width: "20%", flexGrow: 1 }}>
            {/* Set each item to take 20% of the container's width */}
            <MovieCard movie={movie} onImageClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieSlider;
