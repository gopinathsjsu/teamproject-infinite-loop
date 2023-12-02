"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Grid,
  Typography,
  Button,
  Modal,
  Backdrop,
  Fade,
  Stack,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import { getDataFromEndPoint } from "@/src/lib/backend-api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import useStore from "@/src/store";

interface Screen {
  id: string;
  name: string;
  timings: string[];
  maxCapacity: string;
  imageUrl: string;
  format: string;
  currentMovie: string;
  runtime: string;
  cost: string;
  movieId: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const schema = zod.object({
  movie: zod.string().min(1, "Movie is required"),
  ticketPrice: zod.string().min(1, "ticket price is required"),
});

export default function Screen() {
  const router = useRouter();
  const store: any = useStore();
  const { theaterId } = useParams();
  const [screenData, setScreenData] = useState<Screen[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [movieData, setMovieData] = useState<any[]>([]);
  const [selectedScreenId, setSelectedScreenId] = useState(null);
  const handleClose = () => setOpen(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchScreenData = async () => {
      const theater_id = String(theaterId);
      const response = await getDataFromEndPoint(
        "",
        "screen/" + theater_id,
        "GET"
      );
      const data = response.data;
      console.log(data);
      const mappedData: Screen[] = data.map((screenItem: any) => ({
        id: screenItem.id,
        name: screenItem.name,
        timings: screenItem.show_timings,
        maxCapacity: screenItem.seating_capacity,
        imageUrl: screenItem.movie_image,
        format: screenItem.format,
        currentMovie: screenItem.movie_name,
        runtime: screenItem.run_time,
        cost: screenItem.cost,
        movieId: screenItem.movie_id,
        columns: screenItem.columns,
        seatDetails: screenItem.seating_arrangement,
        rows: screenItem.rows,
      }));
      setScreenData(mappedData);
    };

    const fetchMovieData = async () => {
      const response = await getDataFromEndPoint("", "movie/all", "GET");
      const data = response.movies;
      const mappedData = data.map((movie: any) => ({
        id: movie.id,
        name: movie.title,
      }));
      console.log(mappedData);
      setMovieData(mappedData);
    };

    fetchScreenData();
    fetchMovieData();
  }, []);

  const getErrorMessage = (error: any) => {
    return error && typeof error.message === "string" ? error.message : "";
  };

  const addNewScreen = () => {
    router.push("/theater/" + theaterId + "/addScreen");
  };

  function bookTicket(screen: any) {
    console.log(screen);
    router.push(`/movie/${screen.movieId}/buyTicket`);
  }

  function editScreen(screen: any) {
    localStorage.setItem("screenDetails", JSON.stringify(screen));
    router.push(`/theater/${theaterId}/editScreen`);
  }

  async function deleteScreen(screen: any) {
    if (screen.currentMovie === null || screen.currentMovie === "") {
      return;
    }
    const formUrl = "screen/deleteScreen";
    const data = { id: screen.id };
    const resp = await getDataFromEndPoint(data, formUrl, "POST");
    if (resp != null) {
      const response = await getDataFromEndPoint(
        "",
        `screen/${theaterId}`,
        "GET"
      );
      const data = response.data;
      const mappedData: Screen[] = data.map((screenItem: any) => ({
        id: screenItem.id,
        name: screenItem.name,
        timings: screenItem.show_timings,
        maxCapacity: screenItem.seating_capacity,
        imageUrl: screenItem.movie_image,
        format: screenItem.format,
        currentMovie: screenItem.movie_name,
        runtime: screenItem.run_time,
        cost: screenItem.cost,
        movieId: screenItem.movie_id,
        columns: screenItem.columns,
        seatDetails: screenItem.seating_arrangement,
        rows: screenItem.rows,
      }));
      setScreenData(mappedData);
    }
  }

  async function onSubmit(data: any) {
    data["theater_id"] = theaterId;
    data["screen_id"] = selectedScreenId;

    const formUrl = "screen/addMovie";
    try {
      await getDataFromEndPoint(data, formUrl, "POST");
      const response = await getDataFromEndPoint(
        "",
        "screen/" + theaterId,
        "GET"
      );
      const data_req = response.data;
      const mappedData: Screen[] = data_req.map((screenItem: any) => ({
        id: screenItem.id,
        name: screenItem.name,
        timings: screenItem.show_timings,
        maxCapacity: screenItem.seating_capacity,
        imageUrl: screenItem.movie_image,
        format: screenItem.screen_type,
        currentMovie: screenItem.movie_name,
        runtime: String(screenItem.run_time),
        cost: screenItem.cost,
        movieId: screenItem.movie_id,
      }));
      setScreenData(mappedData);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }
  const handleOpenModal = (screen_id: any) => {
    console.log(screen_id);
    setSelectedScreenId(screen_id);
    setOpen(!open);
  };

  const isAdmin = store.isAdmin; // Replace with the actual way to get this info

  const redirectToBuy = (screen: any, time: string) => {
    router.push(
      `/movie/${screen.movieId}/buyTicket?theater=${theaterId}&screen=${screen.id}&time=${time}`
    );
  };

  const standardSize = {
    width: "650px", // Example responsive sizes
    height: "500px", // Set height to auto, but you can fix it if necessary
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid
            container
            sx={{ mb: 2, marginTop: 10, justifyContent: "space-between" }}
          >
            <Typography variant="h4">Screens</Typography>
            {isAdmin && (
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={addNewScreen}
              >
                Add Screen
              </Button>
            )}
          </Grid>
          <Grid item xs={12} container>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="left"
            >
              {screenData.map((screen, index) => {
                if (
                  (screen.currentMovie == null || screen.currentMovie == "") &&
                  !store.isAdmin
                )
                  return null;
                return (
                  <Grid item key={index} sx={standardSize}>
                    <Box
                      sx={{
                        bgcolor: "white",
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                        height: "100%", // Ensure all containers have the same height
                      }}
                    >
                      <img
                        src={screen.imageUrl}
                        alt="screeb"
                        style={{
                          marginBottom: 16,
                          marginRight: 24,
                          width: 192,
                          borderRadius: 8,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mb: 3 }}
                        >
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              mb: 1,
                              fontWeight: "medium",
                              fontSize: "2rem",
                            }}
                            style={{}}
                            color="#01579B"
                          >
                            {screen.name}
                          </Typography>
                          <Box>
                            {isAdmin && (
                              <Button
                                startIcon={<EditIcon />}
                                sx={{ mb: 1, fontSize: "1rem" }}
                                onClick={() => editScreen(screen)}
                              />
                            )}
                            {isAdmin && (
                              <Button
                                startIcon={<DeleteIcon />}
                                sx={{ mb: 1, fontSize: "1rem" }}
                                onClick={() => deleteScreen(screen)}
                              />
                            )}
                          </Box>
                        </Grid>
                        {isAdmin && (
                          <Button
                            sx={{ mb: 1, fontSize: "1rem" }}
                            onClick={() => handleOpenModal(screen.id)}
                          >
                            Add/Change Movie
                          </Button>
                        )}
                        <Box
                          sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            mr: 1,
                            mb: 1,
                            fontSize: "1rem",
                          }}
                        >
                          {`Current Movie: `}
                          {screen.currentMovie}
                        </Box>
                        <Box
                          sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            mr: 1,
                            mb: 1,
                            fontSize: "1rem",
                          }}
                        >
                          {`Run time: `}
                          {screen.runtime} min
                        </Box>
                        <Box
                          sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            mr: 1,
                            mb: 1,
                            fontSize: "1rem",
                          }}
                        >
                          {`Price: `}
                          {screen.cost}
                          {`$`}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Box sx={{ ml: 1 }}>Timings:</Box>
                          <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Box sx={{ ml: 1 }}>
                              {screen.timings.map((time, index) => (
                                <Chip
                                  key={index}
                                  sx={{ ml: 1 }}
                                  label={time}
                                  onClick={() => redirectToBuy(screen, time)}
                                />
                              ))}
                            </Box>
                          </Grid>
                        </Box>
                        <Button
                          onClick={() => {
                            bookTicket(screen);
                          }}
                          variant="contained"
                        >
                          Book Ticket
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              ...style, // Your existing styles
              display: "flex", // Ensures flexbox layout
              justifyContent: "center", // Centers horizontally
              alignItems: "center", // Centers vertically
              // Full width of the parent
              width: "600px",
              maxWidth: "1000px",
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              sx={{ width: "100%", maxWidth: "900px" }}
            >
              <form action="/screen/addMovie" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={6}>
                    <Controller
                      name="movie"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          margin="normal"
                          error={!!errors.format}
                        >
                          <InputLabel>Add Movie</InputLabel>
                          <Select {...field} label="Add Movie">
                            {movieData.map((movie) => (
                              <MenuItem key={movie.id} value={movie.id}>
                                {movie.name}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText id="component-error-text">
                            {getErrorMessage(errors.format)}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={6}>
                    <Controller
                      name="ticketPrice"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          InputProps={{ inputProps: { min: 5, max: 10 } }}
                          type="number"
                          label="Ticket Price"
                          error={!!errors.ticketPrice}
                          helperText={getErrorMessage(errors.ticketPrice)}
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  type="submit"
                >
                  Add Movie
                </Button>
              </form>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
