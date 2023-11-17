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
import { Container, Grid, Input, Paper, Typography } from '@mui/material';

import React, { ChangeEvent, useState } from "react";
import InnerPageContainer from "@/src/app/components/dashboard/common/InnerPageContainer";
import { any, string } from "zod";
import { getDataFromEndPoint } from "@/src/lib/backend-api";
import { Theme, useTheme } from '@mui/material';
import theme from '../../styles/theme';
import { format } from 'path';


const App: React.FC = () => {
  const movie = {
    title: 'Jigarthanda Double X',
    languages: ['Tamil', 'Telugu', 'Hindi', 'Kannada'],
    duration: '2h 52m',
    genres: ['Action', 'Comedy', 'Period'],
    releaseDate: '10 Nov, 2023',
    description: 'Karthik, an aspiring filmmaker finds a producer who is willing to make his film on one condition - that it should be a fierce gangster flick. Due to this, Karthik decides to take inspiration from a real-life gangster, Karthik comes to the temple town of Madurai along with his friend Ooruni for research on thugs.They come to know of the ruthless gangster and a terror in that area Assault Sethu. Karthik takes the help of Kayal and her mother who cook food for Sethu and his henchmen. He also pretends to be in love with the young girl. As he embarks on his task what follows is a commercial cocktail of action, humor and thrills. How Karthik comes out of this tricky web is the rest of the story',
    backgroundPoster: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/jigarthanda-double-x-et00359702-1699446701.jpg', // Add your background poster path here
    trailerLink: 'https://youtu.be/uaqz9v6HdKs?si=V8qc0VSBQpKc75YO', // Add your YouTube video id here
  };
  const dates = ['Tue 14', 'Wed 15', 'Thu 16', 'Fri 17', 'Sat 18'];

    // Sample data for theater times
  const cinemas = [
    {
      name: "Sandhya Theatre RGB Laser Atmos -Madivala",
      times: [
        { showtime: "04:00 PM", format: "2D", availability: "available" },
        { showtime: "10:00 PM", format: "2D", availability: "fast-filling" },
      ],
    },
    {
      name: "Sri Srinivasa Chitramandira, SG Palya",
      times: [
        { showtime: "07:00 PM", format: "2D", availability: "almost-full" },
        { showtime: "10:00 PM", format: "2D", availability: "available" },
      ],
    },
    // ... add more cinema data as needed
  ];

  const getDateButtonClass = (availability: string) => {
    switch (availability) {
      case "fast-filling":
        return "bg-orange-200 text-orange-800";
      case "almost-full":
        return "bg-red-200 text-red-800";
      default:
        return "bg-green-200 text-green-800";
    }
    };

  const cast = [
    { name: 'Actor Name 1', character: 'Character Name 1' },
    { name: 'Actor Name 2', character: 'Character Name 2' },
    // ... other cast members
  ];
  
  const crew = [
    { name: 'Director Name', role: 'Director' },
    { name: 'Producer Name', role: 'Producer' },
    // ... other crew members
  ];

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${movie.backgroundPoster})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    minHeight: '100vh',
  };

  const contentStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0)', // Semi-transparent black background
    padding: '2rem', // Padding around the text
    maxWidth: '50%', // Takes up half of the container width
    color: 'white', // Text color
    lineHeight: '1.4', // Line height for better readability
    marginBottom: '2rem', // Pushes the content up from the bottom
  };


  return (
    <>
    <div>
    <div style={backgroundStyle}>
    <div style={contentStyle}>
          <Typography variant="h3" component="h1" gutterBottom style={{ fontSize: '80px' }}>
            {movie.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom style={{ fontSize: '30px' }}>
            {movie.releaseDate}
          </Typography>
          <Typography variant="subtitle1" gutterBottom style={{ fontSize: '30px' }}>
            {movie.languages.join(', ')} | {movie.duration} | UA
          </Typography>
          <Typography variant="subtitle1" gutterBottom style={{ fontSize: '30px' }}>
            {movie.genres.join(', ')}
          </Typography>
        </div>
      </div>

      <Container
        maxWidth='lg'
        sx={{ borderRadius: 10, overflow: 'hidden', padding: 4, marginTop: 4 }}
      >
        <Typography variant='h5' gutterBottom style={{ fontSize: '40px' }}>
          About the movie
        </Typography>
        <Typography variant='body1' style={{ fontSize: '20px' }} >{movie.description}</Typography>
      </Container>
      <Container
        maxWidth='lg'
        sx={{ borderRadius: 10, overflow: 'hidden', padding: 4, marginTop: 4 }}
      >
        <Typography variant='h5' gutterBottom>
          Cast
        </Typography>
        <ul>
          {cast.map((actor, index) => (
            <li key={`cast-${index}`}>
              <strong>{actor.name}</strong> as {actor.character}
            </li>
          ))}
        </ul>
      </Container>
      <Container
        maxWidth='lg'
        sx={{ borderRadius: 10, overflow: 'hidden', padding: 4, marginTop: 4 }}
      >
        <Typography variant='h5' gutterBottom>
          Crew
        </Typography>
        <ul>
          {crew.map((member, index) => (
            <li key={`crew-${index}`}>
              <strong>{member.role}:</strong> {member.name}
            </li>
          ))}
        </ul>
      </Container>
      <Container maxWidth='lg' sx={{ padding: 4, marginTop: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <Typography variant='h5' gutterBottom>
            Cinema Listings
          </Typography>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            {dates.map((date, index) => (
              <Button
                key={index}
                variant='outlined'
                sx={{ textTransform: 'none', color: 'black' }}
              >
                {date}
              </Button>
            ))}
          </div>
        </Box>
        {cinemas.map((cinema, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{ borderRadius: 10, padding: 4, marginBottom: 4 }}
          >
            <Typography variant='h6' gutterBottom>
              {cinema.name}
            </Typography>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              {cinema.times.map((time, timeIndex) => (
                <Button
                  key={timeIndex}
                  variant='outlined'
                  sx={{
                    textTransform: 'none',
                    ...getDateButtonClass(time.availability),
                  }}
                >
                  {time.showtime} <span style={{ marginLeft: '4px' }}>{time.format}</span>
                </Button>
              ))}
            </div>
            <div
              style={{
                marginTop: '1rem',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <Button variant='text' color='primary'>
                Get Directions
              </Button>
              <Button variant='text' color='primary'>
                More Info
              </Button>
            </div>
          </Paper>
        ))}
      </Container>
    </div>
    </>
  );
};

export default App;