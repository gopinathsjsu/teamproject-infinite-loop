import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box } from '@mui/system';

export default function LocationSearchInput({ sendLocation }: { sendLocation: any }) {
  const [address, setAddress] = useState('');

  const handleSelect = async (value: any) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    sendLocation(value);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "10%",
            width: "90%",
          }}
        >
          <TextField
            {...getInputProps({
              label: "Search Places...",
            })}
            variant="outlined"
            fullWidth
          />
          {loading && <div>Loading...</div>}
          <List sx={{ position: "absolute", zIndex: 1, width: "100%" }}>
            {suggestions.map((suggestion: any) => (
              <ListItem
                {...getSuggestionItemProps(suggestion)}
                sx={{
                  backgroundColor: suggestion.active ? "#b9d2fa" : "#ffffff",
                  cursor: "pointer",
                }}
                key={suggestion.placeId}
              >
                {suggestion.description}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </PlacesAutocomplete>
  );
};
