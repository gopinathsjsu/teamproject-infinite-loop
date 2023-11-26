// components/AdditionalDetailsForm.js
import React, { useState } from 'react';
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
  favoriteCast: z.array(z.string()).nonempty('Select atleast one artist'),
  favoriteCrew: z.array(z.string()).nonempty('Select atleast one crew'),
  preferredLanguages: z.array(z.string()).nonempty('Select atleast one language'),
});

const genres = [
  "Action",
  "Drama",
  "Comedy",
  "Science Fiction",
  "Horror",
  "Romance",
  "Fantasy",
  "Thriller",
  "Adventure",
  "Mystery",
];

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Mandarin Chinese",
  "Hindi",
  "Japanese",
  "Korean",
  "Italian",
  "Russian",
  "Portuguese",
  "Arabic",
  "Turkish",
  "Persian",
  "Swedish",
  "Danish",
  "Norwegian",
  "Finnish",
  "Dutch",
  "Greek",
  "Polish",
  "Hungarian",
  "Czech",
  "Thai",
  "Hebrew",
  "Tamil",
  "Telugu",
  "Bengali",
];

const AdditionalDetailsForm = ({ data, onNext, onBack }: { data: any, onNext: any, onBack: any }) => {
  const { control, formState: { errors }, trigger, getValues, setValue } = useForm({
    resolver: zodResolver(schema),
  });
  const [castData, setCastData] = useState<any>([]);
  const [crewData, setCrewData] = useState<any>([]);

  React.useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setValue('genres', data.genres);
      setValue('favoriteCast', data.favoriteCast);
      setValue('favoriteCrew', data.favoriteCrew);
      setValue('preferredLanguages', data.preferredLanguages);
    }

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/artist/all");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setCrewData(data.Crew);
        setCastData(data.Cast);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();

  }, []);

  const getErrorMessage = (error: any) => {
    return error && typeof error.message === 'string' ? error.message : '';
  };

  const prevStep = () => {
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
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={!!errors.genres}>{getErrorMessage(errors.genres)}</FormHelperText>
            </div>
          )}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="favoriteCast">Favorite Cast</InputLabel>
        <Controller
          name="favoriteCast"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div>
              <Select
                multiple
                value={field.value}
                fullWidth
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors.favoriteCast}
                label="Favorite Casr"
              >
                {castData.map((cast:any) => (
                  <MenuItem key={cast.id} value={cast.id}>
                    {cast.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={!!errors.favoriteCast}>
                {getErrorMessage(errors.favoriteCast)}
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
               {crewData.map((crew:any) => (
                  <MenuItem key={crew.id} value={crew.id}>
                    {crew.name}
                  </MenuItem>
                ))}
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
                {languages.map((language) => (
                  <MenuItem key={language} value={language}>
                    {language}
                  </MenuItem>
                ))}
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
