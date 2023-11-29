'use client';

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Button, Modal, FormControl, InputLabel, Select, MenuItem, Stack, Grid } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/navigation';
import { getDataFromEndPoint } from '@/src/lib/backend-api';
import useStore from '@/src/store';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";


interface Movie {
  id: string;
  title: string;
  poster_url: string;
}

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, fontSize: "50px", color: "#00378f", display: 'block', right: '-5px' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, fontSize: "50px", color: "#00378f", display: 'block', left: '-2px', zIndex: '1' }}
      onClick={onClick}
    />
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  accept: "image/*",
});
const ImageSlider = () => {
  const [open, setOpen] = useState(false);
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    posterName: ""
  });
  const router = useRouter();
  const store: any = useStore();

  const fetchMovieData = async () => {
    const response = await getDataFromEndPoint("", 'poster/all', 'GET');
    console.log(response);
    const data = response.data;
    console.log(data);
    const mappedData = data.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_url: movie.poster_url
    }));
    console.log(mappedData);
    setMovieData(mappedData);
  };

  useEffect(() => {
    fetchMovieData();
  }, []);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleImageClick = (movieName: string) => {
    router.push(`/movies/${movieName}`);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };


  const handleFileChange = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    if (selectedFile) {
      data.append(`poster`, selectedFile);
    }
    data.append("posterName", formData.posterName);
    console.log(data);
    await getDataFromEndPoint(data, 'poster/addPoster', 'POST');
    setSelectedFile(null);
    // const mappedData = post_data.data.map((movie: any) => ({
    //   id: movie.id,
    //   title: movie.title,
    //   poster_url: movie.poster_url
    // }));
    fetchMovieData();
  }
  const handleChangeMultiple = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target;
    setSelectedMovies(typeof value === 'string' ? value.split(',') : (value as string[]));
  };

  const getMovieImages = () => {
    return selectedMovies.map((movieName: string) => {
      const matchingMovie = movieData.find((movie) => movie.title === movieName);
      return matchingMovie ? matchingMovie.poster_url : '';
    });
  };

  const displayImages = selectedMovies.length > 0 ? getMovieImages() : movieData.map((movie) => movie.poster_url);

  return (
    <Box>
      <Slider {...settings}>
        {displayImages.map((image, index) => (
          <div key={index} onClick={() => handleImageClick(selectedMovies[index])} style={{ cursor: 'pointer' }}>
            <img src={image} alt={`Slide ${index}`} style={{ width: '100%', height: 'auto' }} />
          </div>
        ))}
      </Slider>
      {store.isLoggedIn &&
        <Button variant="contained" onClick={handleOpenModal}>
          Add Poster
        </Button>
      }

      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Stack direction="column" spacing={2}>
            <form
              encType="multipart/form-data"
              onSubmit={submitForm}
            >
              <FormControl fullWidth>
                {/* <InputLabel id="mutiple-select-label">Movies</InputLabel>
            <Select
              labelId="mutiple-select-label"
              multiple
              value={selectedMovies}
              onChange={handleChangeMultiple}
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {movieData.map((movie) => (
                <MenuItem key={movie.id} value={movie.title}>
                  {movie.title}
                </MenuItem>
              ))}
            </Select> */}
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      label="Poster Name"
                      name="posterName"
                      placeholder="Poster Name"
                      fullWidth
                      variant="outlined"
                      type="text"
                      onChange={handleInput}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
                  <Button
                    sx={{ width: 200 }}
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    {selectedFile ? (
                      <>
                        File Uploaded{" "}
                        <CheckCircleOutlineIcon sx={{ ml: 1 }} />
                      </>
                    ) : (
                      "Upload Image"
                    )}
                    <VisuallyHiddenInput type="file" onChange={handleFileChange}
                    />
                  </Button>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    type="submit"
                  >Submit
                  </Button>
                </Box>
              </FormControl>
            </form>
          </Stack>
        </Box>
      </Modal >
    </Box >
  );
};

export default ImageSlider;
