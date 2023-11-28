"use client"
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Box, Button, Container, CssBaseline, FormControl, FormHelperText, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from "@mui/material";

import { getDataFromEndPoint } from "@/src/lib/backend-api";
import { Seats } from '@/src/lib/types'
import styles from './Seats.module.scss'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dayjs from 'dayjs';


const schema = zod.object({
    date: zod.date().min(new Date('1900-01-01'), 'Date is required').or(zod.string().nonempty('Date is required')),
    theater: zod.string().min(1, 'Theater is required'),
    screen: zod.string().min(1, 'Screen is required'),
    timing: zod.string().min(1, 'Select at least one timing'),
});

export default function addScreen() {
    const router = useRouter();
    const { movieName } = useParams();
    const [editable, setEditable] = useState<boolean>(true);
    const [theaters, setTheaters] = useState<any[]>([]);
    const [screens, setScreens] = useState<any[]>([]);
    const [timings, setTimings] = useState<any[]>([]);
    const [cost, setCost] = useState(0);
    const [title, setTitle] = useState();
    const [releaseDate, setReleaseDate] = useState<any>();
    const [endDate, setEndDate] = useState();

    //SEATS CODE
    const [seatDetails, setSeatDetails] = useState<Seats>({});
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    useEffect(() => {
        clearSelectedSeats();
        const fetchData = async () => {
            const response: any = await fetch(`http://localhost:8080/theater/getAllTheatersScreens/${movieName}`);
            if (response.status === 200) {
                const res = await response.json();
                setTitle(res.data.movieName);
                setTheaters(res.data.theaters);
                setEndDate(res.data.endDate);
                const currentDate = Dayjs(new Date());
                const openingDate = currentDate > Dayjs(res.data.releaseDate) ? currentDate : Dayjs(res.data.releaseDate);
                setReleaseDate(openingDate);
            }
        }
        fetchData();
    }, [])

    //SEATS CODE
    const clearSelectedSeats = () => {
        let newMovieSeatDetails = { ...seatDetails };
        for (let key in seatDetails) {
            seatDetails[key].forEach((seatValue, seatIndex) => {
                if (seatValue === 2) {
                    seatDetails[key][seatIndex] = 0;
                }
            })
        }
        setSeatDetails(newMovieSeatDetails);
    }

    const changeEditable = () => {
        setEditable(!editable);
    }

    async function validateFileds() {
        trigger();
        const values = getValues();
        if (values.date == null || values.screen == "" || values.theater == "" || values.timing == "") {
            return;
        }
        else {
            const data = {
                theater_id: values.theater,
                screen_id: values.screen,
                movie_id: movieName,
                time: values.timing,
                value: values.date
            }
            const response = await getDataFromEndPoint(data, 'screen/getScreenLayout', 'POST');
            setSeatDetails({ ...response.data.seatArray });
            setCost(response.data.cost);
            changeEditable();
        }
    }

    const { handleSubmit, getValues, trigger, control, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const getErrorMessage = (error: any) => {
        return error && typeof error.message === 'string' ? error.message : '';
    };

    //SEATS CODE
    const getSeatWithOffset = (key: any, rowIndex: number, seatValue: number) => {
        let offset = 0;
        let returnValue = '';
        seatDetails[key].forEach((value, index) => {
            if (value === seatValue && index === rowIndex) {
                returnValue = `${key}${index + 1 - offset}`;
            } else if (value === 3) {
                offset++;
            }
        });
        return returnValue;
    };

    //SEATS CODE
    const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {
        if (editable) return;
        let tempSelectedSeats = selectedSeats;
        if (seatDetails) {
            if (seatValue === 1 || seatValue === 3) {
                return;
            } else if (seatValue === 0) {
                if (selectedSeats.length >= 8) return;
                seatDetails[key][rowIndex] = 2;
                const seatValue = getSeatWithOffset(key, rowIndex, 2);
                tempSelectedSeats.push(seatValue);
            } else {
                seatDetails[key][rowIndex] = 0;
                const seatValue = getSeatWithOffset(key, rowIndex, 0);
                const index = tempSelectedSeats.indexOf(seatValue);
                if (index > -1) tempSelectedSeats.splice(index, 1);
            }
        }
        setSelectedSeats(tempSelectedSeats);
        setSeatDetails({ ...seatDetails });
    }

    //SEATS CODE
    const getClassNameForSeats = (seatValue: number) => {
        let dynamicClass;
        if (editable) {
            dynamicClass = styles.disableSeat;
            if (seatValue == 3) {
                dynamicClass = styles.seatBlocked;
            }
            return `${styles.seats} ${dynamicClass}`
        }
        if (seatValue === 0) {  // Not booked
            dynamicClass = styles.seatNotBooked;
        } else if (seatValue === 1) {  // booked
            dynamicClass = styles.seatBooked;
        } else if (seatValue === 2) {  // Seat Selected
            dynamicClass = styles.seatSelected;
        } else { // Seat Blocked
            dynamicClass = styles.seatBlocked;
        }
        return `${styles.seats} ${dynamicClass}`
    }

    //SEATS CODE
    const RenderSeats = () => {
        let seatArray = [];
        for (let key in seatDetails) {
            let index = 0;
            let colValue = seatDetails[key].map((seatValue, rowIndex) => (
                <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
                    {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
                    {seatValue != 3 ?
                        <span className={getClassNameForSeats(seatValue)} onClick={() => onSeatClick(seatValue, rowIndex, key)}>
                            {index = index + 1}
                        </span> :
                        <span className={getClassNameForSeats(seatValue)}>
                            {1}
                        </span>
                    }
                    {seatDetails && rowIndex === seatDetails[key].length - 1 && <><br /><br /></>}
                </span>
            ))
            seatArray.push(colValue);
        }
        return (
            <div className={styles.seatsLeafContainer}>{seatArray}</div>
        )
    }

    const getReqSeatDeatils = () =>{
        let seatArray = [];
        for (let key in seatDetails) {
            let column = [];
            for(let i=0;i<seatDetails[key].length;i++){
                if(seatDetails[key][i]===2){
                    column.push(3);
                }else{
                    column.push(seatDetails[key][i]);
                }
            }
            seatArray.push(column);
        }
        return seatArray;
    }

    async function onSubmit() {
        let data = getValues();
        console.log(data);
        const timeStamp = data.timing.split(' ')[1];
        console.log(timeStamp);
        let time = null;
        if(timeStamp == 'pm'){
            time = data.timing.split(':')[0];
            time = (Number(time) + 12).toString();
        }else{
            time = data.timing.split(':')[0];
        }
        console.log(time)
        const key = data.theater+'-'+ data.screen + '-' + time + '-' + data.date;
        console.log(key);
        data['screenLayout'] = getReqSeatDeatils();
        data['seatSelected'] = selectedSeats;
        data['movie_id'] = movieName;
        data['key'] = key;
        data['price'] = cost * selectedSeats.length*100;
        data['is_prime'] = false;
        console.log(data);
        const post_data = await getDataFromEndPoint(data, 'payment/buyTickets', 'POST');
    };

    function theaterChange(event: any) {
        theaters.forEach((theater) => {
            if (theater.id == event.target.value) {
                setScreens(theater.screen_details);
            }
        });
    }

    function screenChange(event: any) {
        screens.forEach((screen) => {
            if (screen.id == event.target.value) {
                setTimings(screen.show_timings);
            }
        });
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth={false} style={{ marginLeft: "0px", marginRight: "0px", marginTop: "6%" }}>
                <form action='/screen/addScreen' onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h4">Book Ticket -  {title}</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid sx={{ display: 'flex', justifyContent: 'center', mt: "16px" }} item xs={12} md={12} lg={3}>
                            <Controller
                                name="date"
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            disabled={!editable}
                                            minDate={Dayjs(releaseDate)}
                                            maxDate={Dayjs(endDate)}
                                            sx={{ width: "100%" }}
                                            label="Select Date"
                                            {...field}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                            <Controller
                                name="theater"
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <FormControl disabled={!editable} fullWidth margin="normal" error={!!errors.theater}>
                                        <InputLabel>Theater</InputLabel>
                                        <Select
                                            {...field}
                                            label="Theater"
                                            onChange={(event) => {
                                                field.onChange(event);
                                                theaterChange(event);
                                            }}
                                            value={field.value || ''}
                                        >
                                            {theaters.map((theater) => (
                                                <MenuItem key={theater.id} value={theater.id}>{theater.name}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText id="component-error-text">
                                            {getErrorMessage(errors.theater)}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />

                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                            <Controller
                                name="screen"
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <FormControl disabled={!editable} fullWidth margin="normal" error={!!errors.screen}>
                                        <InputLabel>Screen</InputLabel>
                                        <Select
                                            {...field}
                                            label="Screen"
                                            onChange={(event) => {
                                                field.onChange(event);
                                                screenChange(event);
                                            }}
                                            value={field.value || ''}
                                        >
                                            {screens.map((screen) => (
                                                <MenuItem key={screen.id} value={screen.id}>{screen.name}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText id="component-error-text">
                                            {getErrorMessage(errors.screen)}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />

                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                            <Controller
                                name="timing"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <FormControl disabled={!editable} fullWidth margin="normal" error={!!errors.timing}>
                                        <InputLabel>Timing</InputLabel>
                                        <Select {...field} label="Timing">
                                            {timings.map((time) => (
                                                <MenuItem key={time} value={time}>{time}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText id="component-error-text">{getErrorMessage(errors.timing)}</FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                        <Grid item xs={12} lg={12}>
                            <Grid container justifyContent="center" spacing={2}>
                                {editable ?
                                    <Box gap={2} my={4}>
                                        <Button variant="contained" onClick={validateFileds}>Apply Changes</Button>
                                    </Box>
                                    : <Box gap={2} my={4}>
                                        <Button style={{ marginRight: "5px" }} variant="outlined" onClick={changeEditable}>Change Theater</Button>
                                        {selectedSeats.length !== 0 &&
                                            <Button variant="contained" type="submit" onClick={() => { onSubmit() }}>
                                                Book Ticket Pay ${selectedSeats.length * (cost || 0)}
                                            </Button>
                                        }
                                    </Box>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                <>
                    <div className={styles.seatsContainer}>
                        {seatDetails
                            ? <RenderSeats />
                            : <div> Select Theater and Apply Changes to Select Layout </div>
                        }
                        <div className={styles.cont_screen}>
                            <div className={styles.screen}></div>
                        </div>
                    </div>
                </>
            </Container>
        </React.Fragment>
    )

}