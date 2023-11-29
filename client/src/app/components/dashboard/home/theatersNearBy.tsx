'use client'
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { getDataFromEndPoint } from '@/src/lib/backend-api';
import useStore from '@/src/store';

const Theatercard = ({ theater, onImageClick }: { theater: any, onImageClick: any }) => {
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
            <CardActionArea onClick={() => onImageClick(theater.id)}>
                <CardMedia
                    component="img"
                    height="300"
                    image={theater.image_url}
                    alt={theater.title}
                    sx={{ cursor: 'pointer', transition: 'transform 0.5s ease', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
                />
                {isHovered ? (
                    <Box sx={{ position: 'absolute', bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', p: 1, width: '100%', height: '100%' }}>
                        <Typography variant="h6" component="div">
                            {theater.name}
                        </Typography>
                        <Typography variant="body2">
                            {theater.city}
                        </Typography>
                    </Box>
                ) : (
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {theater.state}
                        </Typography>
                    </CardContent>
                )}
            </CardActionArea>
        </Card>
    );
};

interface TheaterNearByProps {
    location: string;
}
const TheaterNearBy: React.FC<TheaterNearByProps> = ({ location }) => {
    const router = useRouter();
    const store: any = useStore();
    const [theaterNearByData, setTheaterNearByData] = useState([]);
    const handleCardClick = (theaterId: any) => {
        router.push(`/theater/${theaterId}/screens`);
    };

    useEffect(() => {
        const fetchData = async () => {
            const pincode = store.pincode;
            const response = await getDataFromEndPoint('', 'theater/getTheatersNearBy/' + location, 'GET');
            const data = response.theaters;
            console.log(data);
            setTheaterNearByData(data);
            console.log("here");
            console.log(theaterNearByData);
            console.log("here");
        };
        fetchData();
    }, [location]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: theaterNearByData.length,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow className={undefined} style={undefined} onClick={undefined} />,
        prevArrow: <SamplePrevArrow className={undefined} style={undefined} onClick={undefined} />,
    };

    return (
        <Box>
            {theaterNearByData.length ? (
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Theaters Near By
                </Typography>) : ("")}
            <Slider {...settings}>
                {theaterNearByData.map((movie, index) => (
                    <Theatercard key={index} theater={movie} onImageClick={handleCardClick} />
                ))}
            </Slider>
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

export default TheaterNearBy;
