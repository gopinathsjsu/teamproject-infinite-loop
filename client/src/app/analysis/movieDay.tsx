"use client";
import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';
import { getDataFromEndPoint } from "@/src/lib/backend-api";

type Movie = {
  id: string;
  title: string;
  // Include other movie properties as needed
};

const MovieSelection = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // <-- Define the type of state
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [xAxis, setxAxis] = useState<any>([]);
  const [yAxis, setyAxis] = useState<any>([]);

  useEffect(() => {
    // Fetches movie data and sets the first movie's occupancy data by default
    const fetchMovieData = async () => {
      try {
        // const response = await fetch("http://localhost:8080/movie/all");
        const response = await getDataFromEndPoint('', 'movie/all', "GET");
        // const json = await response.json();
        setMovies(response.movies);
        if (response.movies.length > 0) {
          setSelectedMovieId(response.movies[0].id);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, []);

  useEffect(() => {
    const fetchOccupancyData = async () => {
      try {
        // const response = await fetch(
        //   `http://localhost:8080/movie/getMovieOccupancyDayWise/${selectedMovieId}`
        // );
        if (selectedMovieId.length > 0) {
          const response = await getDataFromEndPoint('', `movie/getMovieOccupancyDayWise/${selectedMovieId}`, "GET")
          // const json = await response.json();
          setyAxis(response.data);
          let temp = [];
          for (let i = 0; i < response.data.length; i++) {
            temp.push(i + 1);
          }
          setxAxis(temp);
        }
      } catch (error) {
        console.error("Error fetching occupancy data:", error);
      }
    };
    fetchOccupancyData();
  }, [selectedMovieId]);

  const handleChange = (event: { target: { value: any } }) => {
    const movieId = event.target.value;
    setSelectedMovieId(movieId);
  };

  return (
    <div>
      <FormControl fullWidth>
        <Select
          value={selectedMovieId}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {movies.map((movie) => (
            <MenuItem key={movie.id} value={movie.id}>
              {movie.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {xAxis.length != 0 && yAxis.length > 0 && (
        <LineChart
          xAxis={[{ data: xAxis }]}
          series={[
            {
              data: yAxis,
            },
          ]}
          width={500}
          height={300}
        />
      )}
    </div>
  );
};

export default MovieSelection;
