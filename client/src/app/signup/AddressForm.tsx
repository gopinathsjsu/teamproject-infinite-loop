import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import { Box } from '@mui/system';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';

const schema = zod.object({
  address1: zod.string().min(1, { message: "Address1 is required" }),
  address2: zod.string().optional(),
  city: zod.string().min(1, { message: "City is required" }),
  state: zod.string().min(1, { message: "State is required" }),
  country: zod.string().min(1, { message: "Country is required" }),
  zipCode: zod.string().min(1, { message: "Zip Code is required" }),
});

export default function AddressForm({ data, onNext, onBack }: { data: any, onNext: any, onBack: any }) {
  const { register, trigger, control, formState: { errors }, setValue, getValues } = useForm({
    resolver: zodResolver(schema)
  });

  React.useEffect(() => {
    console.log(data);
    if (Object.keys(data).length !== 0) {
      setValue('address1', data.address1);
      setValue('address2', data.address2);
      setValue('city', data.city);
      setValue('state', data.state);
      setValue('country', data.country);
      setValue('zipCode', data.zipCode);
    }
  }, [data]);

  const [address, setAddress] = React.useState('');

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const addressComponents = results[0].address_components;

    const getAddressComponent = (type: string) => {
      return addressComponents.find(component => component.types.includes(type))?.long_name || '';
    };
    // Format the address1 to include only specific parts (e.g., street name)
    const street = getAddressComponent('route');
    const streetNumber = getAddressComponent('street_number');
    const formattedAddress1 = `${streetNumber} ${street}`;

    setAddress(formattedAddress1); // Set the formatted address to state
    setValue('address1', formattedAddress1); // Update address1 in the form
    setValue('city', getAddressComponent('locality'));
    setValue('state', getAddressComponent('administrative_area_level_1'));
    setValue('country', getAddressComponent('country'));
    setValue('zipCode', getAddressComponent('postal_code'));
  };

  const getErrorMessage = (error: any) => {
    return error && typeof error.message === 'string' ? error.message : '';
  };

  const onSubmit = () => {
    trigger();
    if (Object.keys(errors).length == 0) {
      console.log(getValues());
      let data = getValues();
      onNext(data, 'stepTwoData');
    }
  };

  const prevStep = () =>{
    let data = getValues();
      onBack(data, 'stepTwoData');
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Address Details
      </Typography>
      <form >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <Box>
                  <TextField
                    {...getInputProps({
                      label: 'Address1',
                    })}
                    variant="standard"
                    fullWidth
                    error={Boolean(errors.address1)}
                    helperText={getErrorMessage(errors.address1)}
                  />
                  {loading && <div>Loading...</div>}
                  <List sx={{ position: 'absolute', zIndex: 1, width: '100%' }}>
                    {suggestions.map(suggestion => (
                      <ListItem {...getSuggestionItemProps(suggestion)} sx={{ backgroundColor: suggestion.active ? '#b9d2fa' : '#ffffff', cursor: 'pointer' }} key={suggestion.placeId}>
                        {suggestion.description}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </PlacesAutocomplete>
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("address2")}
              error={Boolean(errors.address2)}
              helperText={getErrorMessage(errors.address2)}
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.city)}
                  helperText={getErrorMessage(errors.city)}
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: Boolean(field.value),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.state)}
                  helperText={getErrorMessage(errors.state)}
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: Boolean(field.value),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.country)}
                  helperText={getErrorMessage(errors.country)}
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: Boolean(field.value),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.zipCode)}
                  helperText={getErrorMessage(errors.zipCode)}
                  id="zipCode"
                  name="zipCode"
                  label="Zip / Postal code"
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: Boolean(field.value),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
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
            Next
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
}
