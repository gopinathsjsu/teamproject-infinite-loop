import React, { useState, useEffect } from 'react';

const Parallax = ({ image, height = '500px' }) => {
  const [offset, setOffset] = useState(0);

  const handleScroll = () => setOffset(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(https://cdn.flatworldsolutions.com/digital-photography/images/how-to-add-the-parallax-effect-to-your-photos.jpg)`,
        backgroundAttachment: 'fixed',
        backgroundPosition: `50% ${offset * 0.5}px`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: height,
      }}
    />
  );
};

export default Parallax;
