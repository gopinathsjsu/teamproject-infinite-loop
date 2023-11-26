// components/AdditionalDetailsForm.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

const schema = z.object({
  genres: z.array(z.string()).nonempty('Select atleast one genre'),
  favoriteArtists: z.array(z.string()).nonempty('Select atleast one artist'),
  favoriteCrew: z.array(z.string()).nonempty('Select atleast one crew'),
  preferredLanguages: z.array(z.string()).nonempty('Select atleast one language'),
});

const AdditionalDetailsForm = ({ data, onNext, onBack }: { data: any, onNext: any, onBack:any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setValue
  } = useForm({
    resolver: zodResolver(schema),
  });

  React.useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setValue('genres', data.genres);
      setValue('favoriteArtists', data.favoriteArtists);
      setValue('favoriteCrew', data.favoriteCrew);
      setValue('preferredLanguages', data.preferredLanguages);
    }
  }, [data]);

  const getErrorMessage = (error: any) => {
    return error && typeof error.message === 'string' ? error.message : '';
  };

  const prevStep = () =>{
    let data = getValues();
    onBack(data, 'stepThreeData');
  }

  const onSubmit = () => {
    trigger();
    if (Object.keys(errors).length == 0) {
      console.log(getValues());
      let data = getValues();
      onNext(data, 'stepThreeData');
    }
  };

  return (
    <form>
      <Typography variant="h6" gutterBottom>
        Additional Details
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="genres">Genres</InputLabel>
        <Controller
          name="genres"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div>
              <Select
                multiple
                value={field.value}
                fullWidth
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors.genres}
                label="Genres"
              >
                <MenuItem value="pop">Pop</MenuItem>
                <MenuItem value="rock">Rock</MenuItem>
                <MenuItem value="hipHop">Hip Hop</MenuItem>
              </Select>
              <FormHelperText error={!!errors.genres}>{getErrorMessage(errors.genres)}</FormHelperText>
            </div>
          )}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="favoriteArtists">Favorite Artists</InputLabel>
        <Controller
          name="favoriteArtists"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div>
              <Select
                multiple
                value={field.value}
                fullWidth
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors.favoriteArtists}
                label="Favorite Artists"
              >
                <MenuItem value="artist1">Artist 1</MenuItem>
                <MenuItem value="artist2">Artist 2</MenuItem>
                {/* Add more artists as needed */}
              </Select>
              <FormHelperText error={!!errors.favoriteArtists}>
                {getErrorMessage(errors.favoriteArtists)}
              </FormHelperText>
            </div>
          )}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="favoriteCrew">Favorite Crew</InputLabel>
        <Controller
          name="favoriteCrew"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div>
              <Select
                multiple
                value={field.value}
                fullWidth
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors.favoriteCrew}
                label="Favorite Crew"
              >
                <MenuItem value="artist1">Artist 1</MenuItem>
                <MenuItem value="artist2">Artist 2</MenuItem>
                {/* Add more artists as needed */}
              </Select>
              <FormHelperText error={!!errors.favoriteCrew}>
                {getErrorMessage(errors.favoriteCrew)}
              </FormHelperText>
            </div>
          )}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="preferredLanguages">Preferred Languages</InputLabel>
        <Controller
          name="preferredLanguages"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div>
              <Select
                multiple
                value={field.value}
                fullWidth
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors.preferredLanguages}
                label="Preferred Languages"
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
                {/* Add more languages as needed */}
              </Select>
              <FormHelperText error={!!errors.preferredLanguages}>
                {getErrorMessage(errors.preferredLanguages)}
              </FormHelperText>
            </div>
          )}
        />
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          sx={{ mt: 3, ml: 1 }}
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={onSubmit}
        >
          Sign In
        </Button>
      </Box>
    </form>
  );
};

export default AdditionalDetailsForm;
