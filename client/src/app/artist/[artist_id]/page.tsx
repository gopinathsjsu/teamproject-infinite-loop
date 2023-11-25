'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

import { getDataFromEndPoint } from '@/src/lib/backend-api';
import { Card, CardContent, Paper, Avatar, Box, Container, Grid, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';



export interface Artist {
  dob: string;
  name: string ;
  id: string;
  dateOfBirth: string;
  description: string;
  profile_url: string;
  profession: string;
   // Assuming this property exists
  // Include other properties as needed
}


export default function ArtistDetails() {
  const router = useRouter();
  const { artist_id } = useParams(); // router.query should be used instead of useParams()
  const [artistData, setArtistData] = useState<Artist | null>(null); // Initialized to null
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof artist_id === 'string') { // Ensure artist_id is a string
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:8080/artist/${artist_id}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setArtistData(data.artist); // Assuming the API returns an object with an 'artist' property
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [artist_id]);



  const handleArtistClick = (name: string) => {
    router.push(`/artist/${artist_id}`);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>; // Loading state
  }

  if (!artistData) {
    return <Typography>No artist data available</Typography>; // No data state
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={0}> {/* Set spacing to 0 */}
        <Grid item xs={6} md={5} lg={4}>
          <Avatar
            alt={artistData.name}
            src={artistData.profile_url}
            variant="square"
            sx={{ width: '90%', height: 'auto' }} // Removed paddingTop to reduce space
          />
        </Grid>
        <Grid item xs={14} md={10} lg={8}>
          <Paper sx={{ p: 4, boxShadow: 3 }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              {artistData.name}
            </Typography>
            <Typography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
              {artistData.profession}
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
              Date of Birth: {artistData.dob.split('T')[0]}
            </Typography>
            {/* <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
              Profile_url: {artistData.profile_url}
            </Typography> */}
            <Typography variant="body1" sx={{ mb: 2 }}>
             {artistData.description}
            </Typography>
            {/* Add additional sections as needed */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );}