'use client'

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { getDataFromEndPoint } from '@/src/lib/backend-api';

interface Movie {
    id: string;
    title: string;
    banner_url: string;
    genres: string[];
}
const movies = [
    {
        "id": "c86f937b-ea07-495c-9047-da30a1b758e5",
        "title": "Spider-Man: Home Coming",
        "banner_url": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Action",
        "category": "Action, Adventure, Sci-Fi"
    },
    {
        "id": "eb1cbd47-ad32-4c6e-ae7e-d57dd2a36920",
        "title": "The Lion King",
        "banner_url": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Adventure",
        "category": "Action, Adventure, Fantasy"
    },
    {
        "id": "8a8bcf52-202c-43f3-ba08-c5edf50be5af",
        "title": "Hypnotic",
        "banner_url": "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-NTAuM0sgTGlrZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00358028-vexszysezf-portrait.jpg",
        "genres": "Mystery",
        "category": "Mystery, Thriller"
    },
    {
        "id": "dec9c725-3673-4e36-afc9-065d6b8c8f8d",
        "title": "JUNG_E",
        "banner_url": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Action",
        "category": "Action, Adventure, Sci-Fi"
    },
    {
        "id": "769cbd36-2b7c-4713-bf31-51dba69cdbf6",
        "title": "Spider-Man: No Way Home",
        "banner_url": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Action",
        "category": "Action, Adventure, Sci-Fi"
    },
    {
        "id": "f77fa2a9-b04c-41df-aa1b-d170a55ef908",
        "title": "Guardians of the Galaxy Vol. 3",
        "banner_url": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Adventure",
        "category": "Action, Comedy, Adventure, Sci-Fi"
    },
    {
        "id": "af4ce5a9-5524-4bbe-b4b4-e3cb82c68451",
        "title": "The Super Mario Bros. Movie",
        "banner_url": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Fantasy",
        "category": "Animation, Comedy, Adventure, Fantasy"
    },
    {
        "id": "31bf35a7-16cf-4003-b72a-6c50f693b082",
        "title": "The Pope's Exorcist",
        "banner_url": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Horor",
        "category": "Horor, Thriller"
    },
    {
        "id": "2ceb60eb-2240-4666-8928-23e676043d4b",
        "title": "John Wick: Chapter 4",
        "banner_url": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Action",
        "category": "Action, Crime, Thriller"
    },
    {
        "id": "26e54af3-bf61-40b4-ad12-1c23f96adeb5",
        "title": "Fast X",
        "banner_url": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Action",
        "category": "Action, Crime"
    },
]

const MovieCard = ({ movie, onImageClick }: { movie: any, onImageClick: any }) => {
    return (
        <Card sx={{ width: 200, height: 360, m: 1, boxShadow: 3 }}>
            <CardActionArea onClick={() => onImageClick(movie.id)}>
                <CardMedia
                    component="img"
                    height="250"
                    image={movie.banner_url}
                    alt={movie.title}
                    sx={{ cursor: 'pointer' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movie.category}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

const MovieSlider = () => {
    const router = useRouter();
    const [movieData, setMovieData] = useState<any[]>([]);
    const handleCardClick = (movieId: string) => {
        router.push(`/movies/${movieId}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDataFromEndPoint("", "movie/getRecommendedMovies", "GET");
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
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
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
        </Box>
    );
};

// Custom arrow components using Material UI Icons
function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, fontSize: "100px", color: "#00378f", display: 'block', right: '20px', zIndex: '1' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, fontSize: "100px", color: "#00378f", display: 'block', left: '2px', zIndex: '1' }}
            onClick={onClick}
        />
    );
}

export default MovieSlider;