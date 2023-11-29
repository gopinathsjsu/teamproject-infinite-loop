// Dashboard.tsx
'use client'
import React from 'react';
import { Box, Grid, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import './adb.css';

const Dashboard = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  // Sample data for charts
  const ticketsSoldPerMovieData = [
    { movie: 'Movie A', ticketsSold: 150 },
    { movie: 'Movie B', ticketsSold: 200 },
    { movie: 'Movie C', ticketsSold: 120 },
    // Add more movies as needed
  ];

  const ticketsSoldPerTheaterData = [
    { theater: 'Theater X', ticketsSold: 180 },
    { theater: 'Theater Y', ticketsSold: 220 },
    { theater: 'Theater Z', ticketsSold: 150 },
    // Add more theaters as needed
  ];

  const ticketsSoldPerLocationData = [
    { location: 'Location 1', ticketsSold: 300 },
    { location: 'Location 2', ticketsSold: 180 },
    { location: 'Location 3', ticketsSold: 250 },
    // Add more locations as needed
  ];

  const ticketsSoldPerDayData = [
    { day: 'Monday', ticketsSold: 120 },
    { day: 'Tuesday', ticketsSold: 180 },
    { day: 'Wednesday', ticketsSold: 200 },
    // Add more days as needed
  ];

  // Sample data for tickets bought vs date for a movie
  const ticketsBoughtVsDateData = [
    { date: '2023-11-01', ticketsBought: 50 },
    { date: '2023-11-02', ticketsBought: 80 },
    { date: '2023-11-03', ticketsBought: 120 },
    { date: '2023-11-04', ticketsBought: 100 },
    { date: '2023-11-05', ticketsBought: 90 },
    // Add more data points as needed
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Tickets Sold Per Movie Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="paper">
            <Typography variant="h6" gutterBottom>
              Tickets Sold Per Movie
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={500}
                height={300}
                data={ticketsSoldPerMovieData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="movie" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="ticketsSold" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Tickets Sold Per Theater Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="paper">
            <Typography variant="h6" gutterBottom>
              Tickets Sold Per Theater
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={500}
                height={300}
                data={ticketsSoldPerTheaterData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="theater" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="ticketsSold" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Tickets Sold Per Location Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="paper">
            <Typography variant="h6" gutterBottom>
              Tickets Sold Per Location
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ticketsSoldPerLocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="ticketsSold"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {ticketsSoldPerLocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Tickets Sold Per Day Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="paper">
            <Typography variant="h6" gutterBottom>
              Tickets Sold Per Day
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={500}
                height={300}
                data={ticketsSoldPerDayData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="day" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="ticketsSold" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Tickets Bought vs Date Chart */}
        <Grid item xs={12}>
          <Paper elevation={3} className="paper">
            <Typography variant="h6" gutterBottom>
              Tickets Bought vs Date
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={500}
                height={300}
                data={ticketsBoughtVsDateData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ticketsBought" stroke="#FFBB28" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
