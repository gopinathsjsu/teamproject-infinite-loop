"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { getDataFromEndPoint } from "@/src/lib/backend-api";
import { Box, Button, Container, CssBaseline, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Seats } from '@/src/lib/types'
import styles from './Customize.module.scss'


const schema = zod.object({
    screenName: zod.string().min(1, 'Screen Name is required'),
    timing: zod.array(zod.string()).min(1, 'Select at least one timing'),
    format: zod.string().min(1, 'Format is required'),
});

const screen =
{
    id: 5,
    ticketCost: 200,
    rows: 20,
    cols: 6,
    seats: {
        A: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    const [seatDetails, setSeatDetails] = useState<Seats>(screen?.seats || {});
    const [row, setRow] = useState<number>(screen?.rows || 0);
    const [column, setColumn] = useState<number>(screen?.cols || 0);
    const [editable, setEditable] = useState<boolean>(false);

    useEffect(() => { clearSelectedSeats(); }, [])
    useEffect(() => { handleSeatSubmit(); }, [row, column])

    const handleSeatSubmit = () => {
        let newSeatObject: Seats = {};
        let key: string;
        for (let i = 0; i < column; i++) {
            if (i < 26) {
                key = String.fromCharCode(65 + i)
            } else {
                let character = String.fromCharCode(64 + (i / 25));
                key = `${character}${String.fromCharCode(64 + i % 25)}`;
            }
            newSeatObject[key] = Array(row).fill(0).map((_, i) => {
                if (seatDetails && seatDetails[key] && seatDetails[key][i]) {
                    return seatDetails[key][i];
                } else {
                    return 0;
                }
            });
        }
        console.log(seatDetails)
        setSeatDetails(newSeatObject);
    }

    const clearSelectedSeats = () => {
        let newMovieSeatDetails = { ...seatDetails };
        for (let key in seatDetails) {
            seatDetails[key].forEach((seatValue, seatIndex) => {
                if (seatValue === 2) {
                    seatDetails[key][seatIndex] = 0;
                }
            })
        }
        return newMovieSeatDetails;
    }

    const changeEditable = () => {
        setEditable(!editable);
    }

    const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {
        if (seatDetails) {
            if (seatValue === 1) {
                return;
            } else if (seatValue === 0) {
                seatDetails[key][rowIndex] = 3;
            } else {
                seatDetails[key][rowIndex] = 0;
            }
        }
        setSeatDetails({ ...seatDetails });
    }

    /**
     * 0 - Not booked
     * 1 - Booked
     * 2 - Selected
     * 3 - Blocked
     */
    const getClassNameForSeats = (seatValue: number) => {
        let dynamicClass;
        if (seatValue === 0) {  // Not booked
            dynamicClass = styles.seatNotBooked;
        } else if (seatValue === 1) {  // booked
            dynamicClass = styles.seatBooked;
        } else if (seatValue === 2) {  // Seat Selected
            dynamicClass = styles.seatSelected;
        } else {  // Seat Blocked
            dynamicClass = styles.seatBlocked;
        }
        return `${styles.seats} ${dynamicClass}`
    }

    const RenderFormatedSeats = () => {
        let seatArray = [];
        for (let key in seatDetails) {
            let index = 0;
            let colValue = seatDetails[key].map((seatValue, rowIndex) => (
                <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
                    {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
                    {seatValue !== 3 ? <span className={getClassNameForSeats(seatValue)}>
                        {index = index + 1}
                    </span> :
                        <span className={getClassNameForSeats(1)}>
                            {rowIndex + 1}
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

    const RenderSeats = () => {
        let seatArray = [];
        for (let key in seatDetails) {
            let colValue = seatDetails[key].map((seatValue, rowIndex) => (
                <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
                    {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
                    <span className={getClassNameForSeats(seatValue)} onClick={() => onSeatClick(seatValue, rowIndex, key)}>
                        {rowIndex + 1}
                    </span>
                    {seatDetails && rowIndex === seatDetails[key].length - 1 && <><br /><br /></>}
                </span>
            ))
            seatArray.push(colValue);
        }
        return (
            <div className={styles.seatsLeafContainer}>{seatArray}</div>
        )
    }

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const getErrorMessage = (error: any) => {
        return error && typeof error.message === 'string' ? error.message : '';
    };

    async function onSubmit(data: any){
        data['rows'] = row;
        data['col'] = column;
        data['seats'] = seatDetails;
        const formUrl = 'screen/addScreen';
        console.log(formUrl);
        try{
            await getDataFromEndPoint(data, formUrl, 'POST');
        }catch(error){
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" style={{ marginLeft: "0px", marginRight: "0px", marginTop: "6%" }}>
                <form action='/screen/addScreen' onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h4">Add New Screen</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={4}>
                            <Controller
                                name="screenName"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <TextField {...field} label="Screen Name" error={!!errors.screenName} helperText={getErrorMessage(errors.screenName)} fullWidth margin="normal" />}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={4}>
                            <Controller
                                name="timing"
                                control={control}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <FormControl fullWidth margin="normal" error={!!errors.timing}>
                                        <InputLabel>Timing</InputLabel>
                                        <Select {...field} multiple label="Timing">
                                            {['9am', '10am', '1pm'].map((time) => (
                                                <MenuItem key={time} value={time}>{time}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText id="component-error-text">{getErrorMessage(errors.timing)}</FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={4}>
                            <Controller
                                name="format"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <FormControl fullWidth margin="normal" error={!!errors.format}>
                                        <InputLabel>Format</InputLabel>
                                        <Select {...field} label="Format">
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
                                <Grid item xs={12} md={12} lg={4}>
                                    <TextField
                                        disabled={!editable}
                                        InputProps={{ inputProps: { min: 5, max: 25 } }}
                                        value={row}
                                        onChange={(e) => setRow(parseInt(e.target.value) || 0)}
                                        type="number"
                                        label="Rows"
                                        error={!!errors.rows}
                                        helperText={getErrorMessage(errors.rows)}
                                        fullWidth />
                                </Grid>
                                <Grid item xs={12} md={12} lg={4}>
                                    <TextField
                                        disabled={!editable}
                                        InputProps={{ inputProps: { min: 5, max: 12 } }}
                                        value={column}
                                        onChange={(e) => setColumn(parseInt(e.target.value) || 0)}
                                        type="number"
                                        label="Columns"
                                        error={!!errors.columns}
                                        helperText={getErrorMessage(errors.columns)}
                                        fullWidth />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                        <Grid item xs={12} lg={12}>
                            <Grid container justifyContent="center" spacing={2}>

                                {editable ?
                                    <Box gap={2} my={4}>
                                        <Button variant="contained" onClick={changeEditable}>Show Preview</Button>
                                    </Box>
                                    : <Box gap={2} my={4}>
                                        <Button style={{ marginRight: "5px" }} variant="outlined" onClick={changeEditable}>Edit Layout</Button>
                                        <Button variant="contained" type="submit">Submit</Button>
                                    </Box>}
                                {/* <Button variant="outlined" onClick={changeEditable}>Edit Layout</Button> */}

                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                <>
                    <div className={styles.seatsContainer}>
                        <p className={styles.header}>Select Seats to be <b className={styles.headerBlockedText}>Removed</b></p>
                        {seatDetails && editable && <RenderSeats />}
                        {seatDetails && !editable && <RenderFormatedSeats />}
                    </div>
                </>
            </Container>
        </React.Fragment>
    )

}