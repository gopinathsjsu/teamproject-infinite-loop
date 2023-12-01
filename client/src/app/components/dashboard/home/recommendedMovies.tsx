'use client'
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { getDataFromEndPoint } from '@/src/lib/backend-api';
import Link from 'next/link'; // Correct import for Next.js Link component



const MovieCard = ({ movie, onImageClick }: { movie: any, onImageClick: any }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            sx={{
                width: 200,  // Set the width to 200 pixels
                height: 300, // Change the height when hovered
                m: 1,
                boxShadow: 3,
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                    boxShadow: 6,
                }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardActionArea onClick={() => onImageClick(movie.id)}>
                <CardMedia
                    component="img"
                    height="300"
                    image={movie.banner_url}
                    alt={movie.title}
                    sx={{ cursor: 'pointer', transition: 'transform 0.5s ease', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
                />
                {isHovered ? (
                    <Box sx={{ position: 'absolute', bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', p: 1, width: '100%', height: '100%' }}>
                        <Typography variant="h6" component="div">
                            {movie.title}
                        </Typography>
                        <Typography variant="body2">
                            {movie.genres}
                        </Typography>
                    </Box>
                ) : (
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {movie.category}
                        </Typography>
                    </CardContent>
                )}
            </CardActionArea>
        </Card>
    );
};

const MovieSlider = () => {
    const router = useRouter();
    const [movieData, setMovieData] = useState([]);
    const handleCardClick = (movieId: any) => {
        router.push(`/movies/${movieId}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDataFromEndPoint('', 'movie/getRecommendedMovies', 'GET');
            const data = response.data;
            console.log(data);
            setMovieData(data);
        };
        fetchData();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: movieData.length <6 ? movieData.length : 6,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow className={undefined} style={undefined} onClick={undefined} />,
        prevArrow: <SamplePrevArrow className={undefined} style={undefined} onClick={undefined} />,
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Recommended Movies
            </Typography>
            <Slider {...settings}>
                {movieData.map((movie, index) => (
                    <MovieCard key={index} movie={movie} onImageClick={handleCardClick} />
                ))}
            </Slider>
            <Box mt={4} sx={{ width: '100%', overflow: 'hidden' }}>
                <style>
                    {`@media (min-width: 1280px) { 
                        .responsive-banner {
                                height: 120px; 
                            }
                        }
                        @media (min-width: 1440px) { 
                        .responsive-banner {
                                height: 200px; 
                            }
                        }
                    `}
                </style>
                <a href="./rewards">
                    <img
                    className="responsive-banner"
                    src="https://drive.google.com/uc?id=1RyP7TcOdok3IYMVMwE364m9ghuLFGRvL" // Modified URL
                    alt="Banner"
                    style={{ width: '100%', objectFit: 'cover', objectPosition: 'center' }}
                    />
                </a>
            </Box>
        </Box>
    );
};

function SampleNextArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, fontSize: '100px', color: '#00378f', display: 'block', right: '20px', zIndex: 1 }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, fontSize: '100px', color: '#00378f', display: 'block', left: '2px', zIndex: 1 }}
            onClick={onClick}
        />
    );
}



export default MovieSlider;
