import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box } from '@mui/system';
import { Button, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { getDataFromEndPoint } from '@/src/lib/backend-api';

const discountSchema = zod.object({
    tuesday: zod.string().min(0, { message: "Must be between 0 and 100" }).max(100, { message: "Must be between 0 and 100" }),
    night_time: zod.string().min(0, { message: "Must be between 0 and 100" }).max(100, { message: "Must be between 0 and 100" })
});

export default function Discount({ submitSuccess }: { submitSuccess: any }) {

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(discountSchema)
    });

    useEffect(() => {
        async function fetchDiscountPrices() {
            try {
                // const response = await fetch("http://localhost:8080/discount/all");
                const data = await getDataFromEndPoint("", `discount/all`, "GET");
                // const data = await response.json();
                setValue(
                  "tuesday",
                  data.data.tuesday_discount_percentage.toString()
                );
                setValue(
                  "night_time",
                  data.data.nighttime_discount_percentage.toString()
                );
            } catch (error) {
                console.error("Failed to fetch", error);
            }
        }
        fetchDiscountPrices();
    }, []);

    const getErrorMessage = (error: any) => {
        return error && typeof error.message === 'string' ? error.message : '';
    };

    const onSubmit = async (data: any) => {
        const response = await getDataFromEndPoint(data, 'discount/add', 'POST');
        submitSuccess(true);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name="tuesday"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="number"
                                label="Tuesday Discounts (%)"
                                error={Boolean(errors.tuesday)}
                                helperText={getErrorMessage(errors.tuesday)}
                                InputProps={{ inputProps: { min: 0, max: 100 } }}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="night_time"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="number"
                                label="Daily Discounts (%)"
                                error={Boolean(errors.night_time)}
                                helperText={getErrorMessage(errors.night_time)}
                                InputProps={{ inputProps: { min: 0, max: 100 } }}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
