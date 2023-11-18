'use client'
import Avatar from '@mui/material/Avatar';
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
import { Container, Grid, Input, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography, styled, IconButton, makeStyles } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

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
    trailerLink: 'https://www.youtube.com/watch?v=uaqz9v6HdKs', // Add your YouTube video id here
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



  const cast = [
    { name: 'Aishwariya', role:"", imageurl: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"},
    { name: 'Mahesh Babu', role:"", imageurl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Mahesh_Babu_in_Spyder_%28cropped%29.jpg"},
    // ... other cast members
  ];
  
  const crew = [
    { name: 'Raghu', role: 'Director' , imageurl:""},
    { name: 'Vamshi', role: 'Producer' ,imageurl:""},
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



  const videoOpts = {
    height: '450px', // Set the height of the video player
    width: '900px', // Set the width of the video player
    border: 'none', // No border
    borderRadius: '20px', // Rounded corners
    overflow: 'hidden', // Prevents the content from spilling outside the border-radius
  };

  // Style for the container that will center the video
  const videoContainerStyle = {
    display: 'flex', // Use flexbox for centering
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    height: '40vh', // Full viewport height to center within the page vertically
    width: '100%', // Ensure the container takes up the full width to center the video properly
  };

  const DateScrollContainer = styled('div')({
    display: 'flex',
    overflowX: 'auto', // Horizontal scroll
    gap: '0.5rem',
    marginBottom: '1rem',
    padding: '0.5rem',
    '&::-webkit-scrollbar': {
      display: 'none', // Hide scrollbar for webkit browsers
    },
  });

  const CinemaButton = styled(Button)({
    textTransform: 'none',
    margin: '0.25rem',
    '&:hover': {
      backgroundColor: '#f50057', // Example hover color, adjust as needed
      color: '#fff',
    },
  });


  

  
  return (
    <>
    <div>
    <div style = {backgroundStyle} >
    <div style={contentStyle}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }} component="h1" gutterBottom style={{ fontSize: '80px' }}>
            {movie.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }} gutterBottom style={{ fontSize: '30px' }}>
            {movie.releaseDate}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }} gutterBottom style={{ fontSize: '30px' }}>
            {movie.languages.join(', ')} | {movie.duration} | UA
          </Typography>
          <Typography variant="subtitle1"sx={{ fontWeight: 'bold', mb: 1 }}  gutterBottom style={{ fontSize: '30px' }}>
            {movie.genres.join(', ')}
          </Typography>
        </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
          }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: 'red',
              color: 'white',
              fontWeight: 'bold',
               width: '150px',  // Adjust the width as needed
            height: '50px',
            }}
          >
            Buy Tickets
          </Button>
        </div>

      <Grid item xs={12} sm={6}>
            <Container
              maxWidth='lg'
              sx={{ borderRadius: 10, overflow: 'hidden', padding: 4, marginTop: 4 }}
            >
              <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2 }} gutterBottom style={{ fontSize: '40px' }}>
                About the movie
              </Typography>
              <Typography variant='body1' style={{ fontSize: '20px' }}>
                {movie.description}
              </Typography>
              <div>
              <Typography variant='body1' padding= '10px' paddingTop='20px'sx={{ fontWeight: 'bold', mb: 2 }} style={{ fontSize: '40px' }}>
                Trailer of the movie
              </Typography>
              <div style={videoContainerStyle}>
                <iframe
                  title="Movie Trailer"
                  src="https://www.youtube.com/embed/uaqz9v6HdKs" // Replace with your video link
                  style={videoOpts}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              </div>
            </Container>
          </Grid>
        

          <Container maxWidth='lg' sx={{ borderRadius: 2, overflow: 'hidden', mt: 2, mb: 4 }}>
            <Typography variant='h5' component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
              Cast
            </Typography>
            <Grid container spacing={1}>  {/* Reduced spacing between grid items */}
              {cast.map((actor, index) => (
                <Grid item key={`cast-${index}`} xs={6} sm={4} md={3} lg={2}> {/* Adjusted grid sizes for less space */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar alt={actor.name} src={actor.imageurl} sx={{ width: 90, height: 90, margin: 'auto', mb: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {actor.name}
                    </Typography>
                    <Typography variant="body2">
                      {actor.role}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>

          <Container maxWidth='lg' sx={{ borderRadius: 2, overflow: 'hidden', mt: 2, mb: 4 }}>
            <Typography variant='h5' component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
              Crew
            </Typography>
            <Grid container spacing={1}>  {/* Reduced spacing between grid items */}
              {crew.map((crewMember, index) => (
                <Grid item key={`crew-${index}`} xs={6} sm={4} md={3} lg={2}> {/* Adjusted grid sizes for less space */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar alt={crewMember.name} src={crewMember.imageurl} sx={{ width: 90, height: 90, margin: 'auto', mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {crewMember.role}
                    </Typography>
                    <Typography variant="subtitle2">
                      {crewMember.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

          </Container>
    </div>
    </>
  );
};

export default App;