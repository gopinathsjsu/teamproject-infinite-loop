import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const schema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  fullName: zod.string().min(1, { message: "Full name is required" }),
  phoneNumber: zod.string().min(10, { message: "Invalid phone number" }),
  dateOfBirth: zod.date(),
  password: zod.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: zod.string(),
  gender: zod.string().min(1, { message: "Gender is required" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function PersonalDetailsForm({ data, onNext }: { data: any, onNext: any }) {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const { register, control, formState: { errors }, getValues, trigger, setValue } = useForm({
    resolver: zodResolver(schema)
  });

  React.useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setValue('email', data.email);
      setValue('fullName', data.fullName);
      setValue('phoneNumber', data.phoneNumber);
      setValue('dateOfBirth', data.dateOfBirth);
      setValue('password', data.password);
      setValue('gender', data.gender);
      setValue('confirmPassword', data.confirmPassword);
      setSelectedFile(data.selectedFile);
    }
  }, [data]);

  const onSubmit = async () => {
    await trigger();
    if (Object.keys(errors).length == 0) {
      let data = getValues();
      data['selectedFile'] = selectedFile;
      onNext(data, 'stepOneData');
    }
  };

  const getErrorMessage = (error: any) => {
    return error && typeof error.message === 'string' ? error.message : '';
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={selectedFile ? URL.createObjectURL(selectedFile) : "/broken-image.jpg"}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Button
                sx={{ width: 200 }}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={getErrorMessage(errors.email)}
              id="email"
              name="email"
              label="Email ID"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("fullName")}
              error={Boolean(errors.fullName)}
              helperText={getErrorMessage(errors.fullName)}
              id="fullName"
              name="fullName"
              label="Full Name"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("phoneNumber")}
              error={Boolean(errors.phoneNumber)}
              helperText={getErrorMessage(errors.phoneNumber)}
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Date of Birth"
                    {...field}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                render={({ field }) => {
                  console.log('Gender Controller Re-rendered');
                  return (
                    <Select
                      {...field}
                      labelId="gender-label"
                      label="Gender"
                      variant="standard"
                      error={Boolean(errors.gender)}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  );
                }}
              />
              <Typography variant="inherit" color="textSecondary">
                {getErrorMessage(errors.gender)}
              </Typography>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={getErrorMessage(errors.password)}
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("confirmPassword")}
              error={Boolean(errors.confirmPassword)}
              helperText={getErrorMessage(errors.confirmPassword)}
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            onClick={onSubmit}
          >
            Next
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
}
