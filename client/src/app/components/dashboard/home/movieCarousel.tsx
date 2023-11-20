import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const images = [
    {
        imgPath: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/9e081727685123.56369171b80b1.jpg',
    },
    {
        imgPath: 'https://static.toiimg.com/thumb/msid-103364335,width-1280,resizemode-4/103364335.jpg',
    },
    {
        imgPath: 'https://pbs.twimg.com/media/F-Jb4EsakAA0afb.jpg',
    },
    {
        imgPath: 'https://www.koimoi.com/wp-content/new-galleries/2021/09/tom-cruises-stolen-car-had-copy-of-top-gun-maverick-script-001.jpg',
    },
];

const ImageSlider = () => {
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

  return (
    <Box>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.imgPath} alt={`Slide ${index}`} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
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
