import React, { useState, useEffect } from 'react';

const Parallax = ({ height = '500px' }) => {
  const [offset, setOffset] = useState(0);

  const handleScroll = () => setOffset(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Replace YOUR_FILE_ID with your actual file ID from Google Drive.
  const gifUrl = "https://drive.google.com/uc?export=view&id=1KWxW1QJftNz1euts-alzr4ev23I-w3zc";

  return (
    <div
      style={{
        backgroundImage: `url(${gifUrl})`,
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
