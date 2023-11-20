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

const schema = zod.object({
    theater: zod.string().min(1, 'Theater is required'),
    screen: zod.string().min(1, 'Screen is required'),
    timing: zod.string().min(1, 'Select at least one timing'),
});

const screen =
{
    id: 5,
    ticketCost: 200,
    seats: {
        A: [0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        C: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        D: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        E: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        F: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        G: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
}

export default function addScreen() {
    const router = useRouter();
    const { theaterId } = useParams();
    const [editable, setEditable] = useState<boolean>(true);

    //SEATS CODE
    const [seatDetails, setSeatDetails] = useState<Seats>(screen.seats || {});
    let selectedSeats: string[] = [];

    useEffect(() => { clearSelectedSeats(); }, [])

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

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const getErrorMessage = (error: any) => {
        return error && typeof error.message === 'string' ? error.message : '';
    };

    //SEATS CODE
    const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {
        if (editable) return;
        if (seatDetails) {
            if (seatValue === 1 || seatValue === 3) {
                return;
            } else if (seatValue === 0) {
                seatDetails[key][rowIndex] = 2;
            } else {
                seatDetails[key][rowIndex] = 0;
            }
        }
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

    //SEATS CODE
    const RenderPaymentButton = () => {
        selectedSeats = [];
        for (let key in seatDetails) {
            seatDetails[key].forEach((seatValue, seatIndex) => {
                if (seatValue === 2) {
                    selectedSeats.push(`${key}${seatIndex + 1}`)
                }
            })
        }
        if (selectedSeats.length) {
            return (
                // href={{ pathname: '/payment', query: { movieId: movie?.id, seatDetails: JSON.stringify(seatDetails) } }}
                <Button variant="contained" href="#contained-buttons" className={styles.paymentButton} >
                    Book Ticket Pay Rs.{selectedSeats.length * (screen?.ticketCost || 0)}
                </Button>
            )
        } else {
            return <></>
        }
    }

    async function onSubmit(data: any) {
        // router.push("/theater/" + theaterId + "/screens/");
        data['seats'] = seatDetails;
        data['theater_id'] = theaterId;
        const formUrl = 'screen/addScreen';
        console.log(formUrl);
        try {
            await getDataFromEndPoint(data, formUrl, 'POST');

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth={false} style={{ marginLeft: "0px", marginRight: "0px", marginTop: "6%" }}>
                <form action='/screen/addScreen' onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h4">Book Ticket</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={4}>
                            <Controller
                                name="theater"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <FormControl disabled={!editable} fullWidth margin="normal" error={!!errors.theater}>
                                        <InputLabel>Theater</InputLabel>
                                        <Select {...field} label="Theater">
                                            {['2D', '3D'].map((format) => (
                                                <MenuItem key={format} value={format}>{format}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText id="component-error-text">{getErrorMessage(errors.format)}</FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={4}>
                            <Controller
                                name="screen"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <FormControl disabled={!editable} fullWidth margin="normal" error={!!errors.format}>
                                        <InputLabel>Screen</InputLabel>
                                        <Select {...field} label="Screen">
                                            {['2D', '3D'].map((format) => (
                                                <MenuItem key={format} value={format}>{format}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText id="component-error-text">{getErrorMessage(errors.format)}</FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={4}>
                            <Controller
                                name="timing"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <FormControl disabled={!editable} fullWidth margin="normal" error={!!errors.format}>
                                        <InputLabel>Timing</InputLabel>
                                        <Select {...field} label="Timing">
                                            {['2D', '3D'].map((format) => (
                                                <MenuItem key={format} value={format}>{format}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText id="component-error-text">{getErrorMessage(errors.format)}</FormHelperText>
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
                                        <Button variant="contained" onClick={changeEditable}>Apply Changes</Button>
                                    </Box>
                                    : <Box gap={2} my={4}>
                                        <Button style={{ marginRight: "5px" }} variant="outlined" onClick={changeEditable}>Change Theater</Button>
                                        {/* <Button disabled={selectedSeats.length === 0} variant="contained" type="submit">Book Tickets Pay Rs.{selectedSeats.length * (screen?.ticketCost || 0)}</Button> */}
                                        <RenderPaymentButton />
                                    </Box>}
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                <>
                    <div className={styles.seatsContainer}>
                        {seatDetails && <RenderSeats />}
                        <div className={styles.cont_screen}>
                            <div className={styles.screen}></div>
                        </div>
                    </div>
                </>
            </Container>
        </React.Fragment>
    )

}