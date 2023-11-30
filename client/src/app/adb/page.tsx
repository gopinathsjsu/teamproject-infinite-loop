"use client"
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { Box } from '@mui/system';
import { Autocomplete, Grid, TextField } from '@mui/material';

const chartSetting = {
    width: 500,
    height: 300,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};

export default function BarsDataset() {
    const [movies, setMovies] = React.useState([]);
    const [cities, setCities] = React.useState<any>([]);
    const [cityTheaterData, setCityTheaterData] = React.useState<any>([]);
    const [movieId, setMovieId] = React.useState(null);
    const [xAxis, setxAxis] = React.useState<any>([]);
    const [yAxis, setyAxis] = React.useState<any>([]);

    React.useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://localhost:8080/movie/all");
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setMovies(data.movies);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
        fetchMovies();
    }, []);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/screen/getTicketsBoughtByTheatersLocation/${movieId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                const cityData = data.data;
                setCityTheaterData(cityData);
                setCities(Object.keys(cityData));
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
        if (movieId != null) {
            fetchData();
        }
    }, [movieId]);

    const handleMovieChange = (event: any, value: any) => {
        setMovieId(value ? value.id : "");
    };

    const handleCityChange = (event: any, value: any) => {
        setxAxis(Object.keys(cityTheaterData[value]));
        const dataValues = Object.keys(cityTheaterData[value]).map((key)=>{
            return cityTheaterData[value][key];
        })
        setyAxis(dataValues);
    };

    return (
        <Box sx={{ ml: 10, mt: 5 }}>
            <Box>
                <Grid spacing={2} container>
                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={movies}
                            getOptionLabel={(option: any) => option.title} // Show the movie title in the dropdown
                            onChange={handleMovieChange} // Handle selection change
                            sx={{ width: 300, mr: 2 }}
                            renderInput={(params) => <TextField {...params} label="Movie" />}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={cities}
                            getOptionLabel={(option: any) => option}
                            onChange={handleCityChange}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="City" />}
                        />
                    </Grid>
                </Grid>
            </Box>
            {xAxis.length !== 0 && yAxis.length !==0 &&
                <BarChart
                    xAxis={[{ scaleType: 'band', data: xAxis }]}
                    series={[ { data : yAxis}]}
                    {...chartSetting}
                />
            }
        </Box>
    );
}