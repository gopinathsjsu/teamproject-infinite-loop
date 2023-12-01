'use client';
import { Paper, Typography, Box, Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ReactToPrint from "react-to-print";
interface TicketProps {
    name: string;
    movieName: string;
    showTime: string;
    seatNo: string;
    theaterName: string;
    qrLink: string;
    screenName: string;
    date: string;
}
const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    width: '100vw', // Full viewport width
};

const cardStyle = {
    transform: 'scale(1.25)', // Increase size by 25%
    // Add other styling for the card here if needed
};
const TicketCard: React.FC<TicketProps> = ({ name, movieName, showTime, seatNo, theaterName, qrLink, screenName, date }) => {
    const ticketRef = useRef<HTMLDivElement>(null);
    const [qrCodeLoaded, setQrCodeLoaded] = useState(false);

    const downloadPdf = () => {
        window.print();
    };



    return (
        <div style={containerStyle}>
            <div style={cardStyle} ref={ticketRef}>
                <Paper elevation={3} sx={{
                    maxWidth: 300, margin: 'auto', padding: 2, backgroundColor: '#80CBC4'
                }}>
                    <Typography variant="h5" component="h1" sx={{ color: 'black', textAlign: 'center', marginBottom: 2 }}>
                        Box Office
                    </Typography>
                    <Typography variant="h6" component="h2" sx={{ color: 'black', textAlign: 'center', marginBottom: 2 }}>
                        Ticket
                    </Typography>
                    <Box sx={{ color: 'black', margin: '2px', textAlign: 'center' }}>
                        <Typography variant="body1">Hi {name},</Typography>
                        <Typography variant="body1">Your ticket for the</Typography>
                        <Typography variant="body1">Movie Name : <span style={{ fontWeight: 'bold' }}> {movieName}</span></Typography>
                        <Typography variant="body1">Screen Name : {screenName}</Typography>
                        <Typography variant="body1">Date : {date}</Typography>
                        <Typography variant="body1">Show Time :<span style={{ fontWeight: 'bold' }}> {showTime}</span></Typography>
                        <Typography variant="body1">SeatNos :<span style={{ fontWeight: 'bold' }}> {seatNo} </span></Typography>
                        <Typography variant="body1">Theater Name : {theaterName}</Typography>
                        <Typography variant="body1">scan this QR at the theater to enjoy your show</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, overflow: 'visible' }}>
                        {/* <QrCode value="some_string_value" size={128} fgColor="#000000" bgColor="#ffffff" /> */}
                        <img src={qrLink} style={{ width: 128, height: 128, backgroundColor: "#ffffff", color: "#000000" }} onLoad={() => setQrCodeLoaded(true)} />
                    </Box>
                    <Button onClick={downloadPdf} disabled={!qrCodeLoaded} startIcon={<CloudUploadIcon />} sx={{ color: 'white' }} >Download as PDF</Button>
                </Paper >
            </div>
        </div>
    );
};

export default TicketCard;
