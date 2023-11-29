import React from 'react';

const LoadingAnimation = () => {
  const loadingImageUrl = 'https://media.giphy.com/media/Ck8tWBj2lCTnUKdwxW/giphy.gif';

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #f8f8f8, #e7e7e7)' // Light grey gradient background
    }}>
      <img src={loadingImageUrl} alt="Loading..." style={{ width: '200px', height: '200px' }} />
    </div>
  );
};

export default LoadingAnimation;
