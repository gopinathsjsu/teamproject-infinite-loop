"use client"
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { Box } from '@mui/system';
import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import { DefaultizedPieValueType } from '@mui/x-charts';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import MovieSelection from './movieDay';

const chartSetting = {
    width: 500,
    height: 300,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};

const sizing = {
    width: 400,
    height: 300,
    // legend: { hidden: true },
};

export default function BarsDataset() {
    const [movies, setMovies] = React.useState([]);
    const [cities, setCities] = React.useState<any>([]);
    const [cityTheaterData, setCityTheaterData] = React.useState<any>([]);
    const [movieId, setMovieId] = React.useState(null);
    const [xAxis, setxAxis] = React.useState<any>([]);
    const [yAxis, setyAxis] = React.useState<any>([]);

    //pie chart
    const [pieChartData, setPieChartData] = React.useState<any>([]);
    const [total, setTotal] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://localhost:8080/movie/all");
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setMovies(data.movies);
                setMovieId(data.movies[0].id)
                setxAxis([]);
                setyAxis([]);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }

        const fetchPieData = async () => {
            try {
                const response = await fetch("http://localhost:8080/screen/getTicketsBookedInTheaters");
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                const filteredData = data.data.filter((item: any) => {
                    if (item.value != 0) return true;
                    return false;
                });
                const TOTAL = data.data.map((item: any) => item.value).reduce((a: number, b: number) => a + b, 0);
                setTotal(TOTAL);
                setPieChartData(filteredData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }

        fetchMovies();
        fetchPieData();
    }, []);

    const getArcLabel = (params: DefaultizedPieValueType) => {
        const percent = params.value / total;
        return `${(percent * 100).toFixed(0)}%`;
    };

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
        if (value) {
            setxAxis(Object.keys(cityTheaterData[value]));
            const dataValues = Object.keys(cityTheaterData[value]).map((key) => {
                return cityTheaterData[value][key];
            })
            setyAxis(dataValues);
        }
    };

    return (
        <Box sx={{ ml: 10, mt: 5 }}>
            <Grid spacing={2} container>
                <Grid item xs={6}>
                    <Typography variant='h4'>Movie vs Location vs Theater</Typography>
                    <Grid item xs={12} sx={{ display: "flex" }}>
                        <Grid item xs={6}>
                            <Autocomplete         
                                disableClearable                       
                                options={movies}
                                getOptionLabel={(option: any) => option.title}
                                onChange={handleMovieChange}
                                sx={{ mr: 2, width: "90%" }}
                                renderInput={(params) => <TextField {...params} label="Movie" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete      
                                disableClearable                          
                                options={cities}
                                getOptionLabel={(option: any) => option}
                                sx={{ width: "90%" }}
                                onChange={handleCityChange}
                                renderInput={(params) => <TextField {...params} label="City" />}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {xAxis.length !== 0 && yAxis.length !== 0 &&
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: xAxis }]}
                                series={[{ data: yAxis }]}
                                {...chartSetting}
                            />
                        }
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h4'>Theaters Booking</Typography>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                        {pieChartData.length != 0 &&
                            <PieChart
                                margin={{ top: 20, left: 10, right: 400 }}
                                series={[
                                    {
                                        outerRadius: 80,
                                        data: pieChartData,
                                        arcLabel: getArcLabel,
                                    },
                                ]}
                                slotProps={{
                                    legend: {
                                        direction: 'column',
                                        position: {vertical:'middle', horizontal: 'right' },
                                        padding: 0,
                                    },
                                }}
                                sx={{
                                    [`& .${pieArcLabelClasses.root}`]: {
                                        fill: 'white',
                                        fontSize: 14,
                                    },
                                }}
                                {...sizing}
                            />
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "center" }} spacing={2} container>
                <Typography variant='h4'>Movie vs Date Booking</Typography>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <MovieSelection />
                </Grid>
            </Grid>
        </Box>
    );
}