'use client';
import { Box, Button, Container, ImageList, ImageListItem, Typography, Card } from '@mui/material';
import { useState } from 'react';


type ImageContainerProps = {
    src: string;
    onAddToCart: (amount: number) => void; // Assuming 'onAddToCart' is a function that takes a number
  };

  const ImageContainer = ({ src, onAddToCart }: ImageContainerProps) => {
    const [count, setCount] = useState(0);
  
    const handleIncrement = () => {
      const newCount = count + 1;
      setCount(newCount);
      onAddToCart(1); // Call onAddToCart with the amount being added
    };
  
    const handleDecrement = () => {
      const newCount = Math.max(count - 1, 0);
      setCount(newCount);
      onAddToCart(-1); // Call onAddToCart with the amount being subtracted
    };

  return (
    <Card sx={{ width: '40%', marginBottom: 2, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', boxShadow: 2 }}>
      <img src={src} style={{ width: '100%', height: 'auto' }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '8px' }}>
        <Button variant="outlined" color="primary" onClick={handleIncrement} sx={{ minWidth: '48px', boxShadow: 1 }}>
          +
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleDecrement} disabled={count === 0} sx={{ minWidth: '48px', boxShadow: 1 }}>
          -
        </Button>
      </Box>
    </Card>
  );
};

export default function HomePage() {
  const [totalItems, setTotalItems] = useState(0);
  const itemPrice = 10;

  const handleAddToCart = (change: any) => {
    setTotalItems(totalItems + change);
  };

  const formURl=`http://ec2-3-101-12-15.us-west-1.compute.amazonaws.com/api/payment/merchandise/checkout_session/${totalItems}/${itemPrice}`

  const images = ['https://scontent-sjc3-1.xx.fbcdn.net/v/t1.6435-9/46282568_1008297862711032_2827960145911218176_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=EISr4vn0HVIAX9fupq4&_nc_ht=scontent-sjc3-1.xx&oh=00_AfBfOOydZXeKGhcabHrGhyRvyhlpuP3WeaZ0rP0682wBUg&oe=658F2581',
    'https://pbs.twimg.com/media/FHIo0-XVcAAWmaD.jpg',
  'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.6435-9/175348669_10159307436625396_1528083320368309883_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=c2f564&_nc_ohc=F9fsg97iykEAX8qqOmj&_nc_ht=scontent-sjc3-1.xx&oh=00_AfCx9EyWaPIMao5R5YUTRUczsk0yHSNPeWql4Km5JOjgyA&oe=658F2DDB',
  'https://nomoreworkhorse.files.wordpress.com/2016/07/index1.jpg',

];

  return (
    <Container maxWidth="lg">
      
      <ImageList cols={1}>
        {images.map((src, index) => (
          <ImageListItem key={index}>
            <ImageContainer src={src} onAddToCart={handleAddToCart} />
          </ImageListItem>
        ))}
      </ImageList>

      <Card sx={{ position: 'fixed', top: 80, right: 20, padding: 2, width: 300, boxShadow: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Cart</Typography>
        <Typography sx={{ marginBottom: 2 }}>Total Items: {totalItems}</Typography>
        <Typography sx={{ marginBottom: 2 }}>Total Amount: ${totalItems * itemPrice}</Typography>
        <form action={formURl} method="GET">
          <Button type="submit" variant="contained" color="success" fullWidth>Checkout</Button>
        </form>
      </Card>
    </Container>
  );
}
