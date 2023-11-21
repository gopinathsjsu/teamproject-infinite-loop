import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/navigation'; // Import the useRouter hook


const images = [
    {
        imgPath: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/9e081727685123.56369171b80b1.jpg',
        movieName:'movie-1',
    },
    {
        imgPath: 'https://static.toiimg.com/thumb/msid-103364335,width-1280,resizemode-4/103364335.jpg',
        movieName:'movie-2',

    },
    {
        imgPath: 'https://pbs.twimg.com/media/F-Jb4EsakAA0afb.jpg',
        movieName:'movie-3',

    },
    {
        imgPath: 'https://www.koimoi.com/wp-content/new-galleries/2021/09/tom-cruises-stolen-car-had-copy-of-top-gun-maverick-script-001.jpg',
        movieName:'movie-4',

    },
];

const ImageSlider = () => {
  const router = useRouter(); // Initialize the router

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
    prevArrow: <SamplePrevArrow />
  };

  const handleImageClick = (movieName: any) => {
    // Redirect to the movie's page
    router.push(`/movies/${movieName}`);
  };

  return (
    <Box sx={{ marginTop: '70px' }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} onClick={() => handleImageClick(image.movieName)} style={{ cursor: 'pointer' }}>
            <img src={image.imgPath} alt={`Slide ${index}`} style={{ width: '100%', height: 'auto', objectFit: 'scale-down' }} />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

function SampleNextArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', borderRadius: '50%', padding: '10px' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', borderRadius: '50%', padding: '10px' }}
      onClick={onClick}
    />
  );
}

export default ImageSlider;
