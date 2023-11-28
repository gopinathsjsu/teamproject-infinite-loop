import React from 'react';

const LoadingAnimation = () => {
  // You can replace this URL with the path to your own animated loading image
  const loadingImageUrl = 'https://media.giphy.com/media/DnU97wuSjD1xTXW6Dx/giphy.gif';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img src={loadingImageUrl} alt="Loading..." style={{ width: '100px', height: '100px' }} />
    </div>
  );
};

export default LoadingAnimation;
