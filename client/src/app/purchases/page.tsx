// Import necessary modules and components
'use client'
import React, { useState, useEffect } from 'react';
import InnerPageContainer from '../components/dashboard/common/InnerPageContainer';
import useStore from '@/src/store';
import './pur.css';
import { Card, CardMedia, CardContent, Typography, Grid, Chip, CardActions, Button, Modal, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Stack } from '@mui/system';
import { getDataFromEndPoint } from '@/src/lib/backend-api';

// Define interfaces for Movie and Ticket
interface Movie {
  name: string;
  poster_url: string;
}

interface Ticket {
  details: {
    _id: string;
    id: string;
    user_id: string;
    movie_id: string;
    payment_method: string;
    price: number;
    qr_code: string;
    refund_requested: boolean;
    refund_status: string;
    screen_id: string;
    seat_ids: string[];
    show_date: string;
    show_time: string;
    status: string;
    theater_id: string;
    __v: number;
  };
  movie: Movie;
  theater: string;
  qr_url: string;
}

// TicketsPage component
const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const store: any = useStore(); // Cast to 'any' if Store type is not defined

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/getPurchaseHistory/${store.user?.user_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        if (!jsonResponse || !Array.isArray(jsonResponse.data)) {
          throw new Error('Data is not in the expected format');
        }
        setTickets(jsonResponse.data);
        setIsLoading(false);
      } catch (e) {
        const error = e as Error;
        console.error('Fetching tickets failed: ', error);
        setError(error.message);
        setIsLoading(false);
      }
    };



    if (store.user?.user_id) {
      fetchTickets();
    } else {
      setError('User ID is not available.');
      setIsLoading(false);
    }
  }, [store.user?.user_id]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Grid item xs={4} sx={{ paddingLeft: '90px' }}>
      <InnerPageContainer title="Purchases">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Tickets</h1>
          <div className="ticket-grid">
            {tickets.map((ticket, index) => (
              <TicketCard key={index} ticket={ticket} />
            ))}
          </div>
        </div>
      </InnerPageContainer>
    </Grid>
  );
};




const TicketCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  const qrCodeSrc = ticket.qr_url;
  const [isModalOpen, setModalOpen] = useState(false);
  const handleCancel = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleYes = async () => {
    console.log(ticket)
    const cancel_data = await getDataFromEndPoint(ticket, 'user/cancelTicket', "POST");
    setModalOpen(false);
  };
  return (
    <Card sx={{ m: 2, boxShadow: 3, width: '500px', height: '400px', padding: '0px 0px' }}>
      <CardMedia
        component="img"
        height="140"
        image={ticket.movie.poster_url}
        alt={`${ticket.movie.name} Poster`}
      />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {ticket.movie.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {ticket.theater}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(ticket.details.show_date).toLocaleDateString()} • {ticket.details.show_time}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Screen: {ticket.details.screen_id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Seats: {ticket.details.seat_ids ? ticket.details.seat_ids.join(', ') : 'No seats available'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ${ticket.details.price}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={4}>
          <Stack direction="column" spacing={2} >
            {ticket.details.refund_requested ? '' : <img src={qrCodeSrc} alt="QR Code" style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto' }} />}
            {ticket.details.refund_requested ? '' : <Button sx={{ color: 'red' }} onClick={handleCancel}>Cancel</Button>}
          </Stack>
          <Box mt={5}>
            <Typography variant="subtitle1" >
              {ticket.details.refund_requested ? <Chip label="Cancelled" color="error" /> : ''}
            </Typography>
          </Box>
        </Grid>
        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to cancel?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              No
            </Button>
            <Button onClick={handleYes} sx={{ color: 'red' }} >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Card>
  );
};

export default TicketsPage;
