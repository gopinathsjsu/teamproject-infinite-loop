"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import useStore from "@/src/store";

const MovieCard = ({
  movie,
  onImageClick,
}: {
  movie: any;
  onImageClick: any;
}) => {
  return (
    <Card sx={{ width: 200, height: 400, m: 1, boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{
          width: 200, // makes image take full width of the card
          height: 300, // fixed height
          objectFit: "cover", // will cover the space, maintaining aspect ratio without stretching
          cursor: "pointer",
        }}
        image={movie.banner_url}
        alt={movie.title}
        onClick={() => onImageClick(movie.id)} // Uncomment this line if click handler is needed
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle2" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.format}
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
  const store: any = useStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/movie/all");
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

  // const navigate = useNavigate(); // Call useNavigate at the top level of your component
  const router = useRouter();
  const handleAddMovieClick = () => {
    router.push("/movies/add"); // Use navigate function to change the route
  };

  const handleCardClick = (movieid: string) => {
    console.log(`Clicked on ${movieid}`);
    router.push(`/movies/${movieid}`);
    // Implement your own logic here, such as navigation
  };

  return (
    <Container maxWidth={false} sx={{ my: 5 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Recommended Movies
      </Typography>
      {store.isAdmin && (
        <Button
          variant="contained"
          sx={{ paddingLeft: 2 }}
          color="error" // Use the 'error' color from the theme for a red button
          onClick={handleAddMovieClick}
        >
          Add Movie
        </Button>
      )}

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
