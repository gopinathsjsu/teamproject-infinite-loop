import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const movies = [
    {
        "id": "c86f937b-ea07-495c-9047-da30a1b758e5",
        "movieTitle": "Spider-Man: Home Coming",
        "movieImage": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Action",
        "category": "Action, Adventure, Sci-Fi"
    },
    {
        "id": "eb1cbd47-ad32-4c6e-ae7e-d57dd2a36920",
        "movieTitle": "The Lion King",
        "movieImage": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Adventure",
        "category": "Action, Adventure, Fantasy"
    },
    {
        "id": "8a8bcf52-202c-43f3-ba08-c5edf50be5af",
        "movieTitle": "Hypnotic",
        "movieImage": "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-NTAuM0sgTGlrZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00358028-vexszysezf-portrait.jpg",
        "genres": "Mystery",
        "category": "Mystery, Thriller"
    },
    {
        "id": "dec9c725-3673-4e36-afc9-065d6b8c8f8d",
        "movieTitle": "JUNG_E",
        "movieImage": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Action",
        "category": "Action, Adventure, Sci-Fi"
    },
    {
        "id": "769cbd36-2b7c-4713-bf31-51dba69cdbf6",
        "movieTitle": "Spider-Man: No Way Home",
        "movieImage": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Action",
        "category": "Action, Adventure, Sci-Fi"
    },
    {
        "id": "f77fa2a9-b04c-41df-aa1b-d170a55ef908",
        "movieTitle": "Guardians of the Galaxy Vol. 3",
        "movieImage": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Adventure",
        "category": "Action, Comedy, Adventure, Sci-Fi"
    },
    {
        "id": "af4ce5a9-5524-4bbe-b4b4-e3cb82c68451",
        "movieTitle": "The Super Mario Bros. Movie",
        "movieImage": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Fantasy",
        "category": "Animation, Comedy, Adventure, Fantasy"
    },
    {
        "id": "31bf35a7-16cf-4003-b72a-6c50f693b082",
        "movieTitle": "The Pope's Exorcist",
        "movieImage": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Horor",
        "category": "Horor, Thriller"
    },
    {
        "id": "2ceb60eb-2240-4666-8928-23e676043d4b",
        "movieTitle": "John Wick: Chapter 4",
        "movieImage": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Action",
        "category": "Action, Crime, Thriller"
    },
    {
        "id": "26e54af3-bf61-40b4-ad12-1c23f96adeb5",
        "movieTitle": "Fast X",
        "movieImage": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/keedaa-cola-et00369553-1699610496.jpg",
        "genres": "Action",
        "category": "Action, Crime"
    },
]

const MovieCard = ({ movie, onImageClick }: { movie: any, onImageClick: any }) => {
    return (
        <Card sx={{ width: 200, height: 360, m: 1, boxShadow: 3 }}>
            <CardMedia
                component="img"
                height="250"
                image={movie.movieImage}
                alt={movie.movieTitle}
                onClick={() => onImageClick(movie.movieTitle)} // Click handler is now on the image
                sx={{ cursor: 'pointer' }} // Add a pointer cursor on hover
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {movie.movieTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {movie.category}
                </Typography>
            </CardContent>
        </Card>
    );
};

const MovieSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 5,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    const handleCardClick = (movieName: string) => {
        console.log(`Clicked on ${movieName}`);
        // Implement your own logic here, such as navigation
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Recommended Movies
            </Typography>
            <Slider {...settings}>
                {movies.map((movie, index) => (
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
        <Box
            className={className}
            style={{ ...style, display: 'block', right: '-25px' }}
            onClick={onClick}
        >
            <ArrowForwardIosIcon />
        </Box>
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <Box
            className={className}
            style={{ ...style, display: 'block', left: '-25px', zIndex: 1 }}
            onClick={onClick}
        >
            <ArrowBackIosIcon />
        </Box>
    );
}

export default MovieSlider;
