'use client';

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Button, Modal, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/router';
import { getDataFromEndPoint } from '@/src/lib/backend-api';

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

const ImageSlider = () => {
  const [open, setOpen] = useState(false);
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await getDataFromEndPoint("", 'movie/all', 'GET');
      const data = response.movies;
      const mappedData = data.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        poster_url: movie.poster_url
      }));
      setMovieData(mappedData);
    };

    fetchMovieData();
  }, []);

  const router = isMounted ? useRouter() : null;

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
      <Button variant="contained" onClick={handleOpenModal}>
        Select Movies
      </Button>

      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <FormControl fullWidth>
            <InputLabel id="mutiple-select-label">Movies</InputLabel>
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
            </Select>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageSlider;
