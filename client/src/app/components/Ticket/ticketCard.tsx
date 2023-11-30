'use client';
import { Paper, Typography, Box, Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
interface TicketProps {
    name: string;
    movieName: string;
    showTime: string;
    seatNo: string;
    theaterName: string;
    qrLink: string;
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
const TicketCard: React.FC<TicketProps> = ({ name, movieName, showTime, seatNo, theaterName, qrLink }) => {
    const ticketRef = useRef<HTMLDivElement>(null);
    const [qrCodeLoaded, setQrCodeLoaded] = useState(false);

    const downloadPdf = () => {
        if (ticketRef.current && qrCodeLoaded) {
            html2canvas(ticketRef.current, {
                scale: 1, useCORS: true, windowHeight: ticketRef.current.scrollHeight,
                windowWidth: ticketRef.current.scrollWidth
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'p',
                    unit: 'mm',
                    format: 'a4',
                });

                const imgWidth = 190;
                const imgHeight = (canvas.height * imgWidth / canvas.width) - 50;
                pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
                pdf.save('ticket.pdf');
            });
        } else {
            console.error('Ticket content is not fully loaded');
        }
    };


    return (
        <div style={containerStyle}>
            <div style={cardStyle} ref={ticketRef}>
                <Paper elevation={3} sx={{
                    maxWidth: 300, margin: 'auto', padding: 2, backgroundColor: '#26a69a'
                }}>
                    <Typography variant="h5" component="h1" sx={{ color: '#fff', textAlign: 'center', marginBottom: 2 }}>
                        Box Office
                    </Typography>
                    <Typography variant="h6" component="h2" sx={{ color: '#fff', textAlign: 'center', marginBottom: 2 }}>
                        Ticket
                    </Typography>
                    <Box sx={{ color: '#fff', margin: '16px', textAlign: 'center' }}>
                        <Typography variant="body1">Hi {name},</Typography>
                        <Typography variant="body1">Your ticket for the</Typography>
                        <Typography variant="body1">{movieName}</Typography>
                        <Typography variant="body1">{showTime}</Typography>
                        <Typography variant="body1">{seatNo}</Typography>
                        <Typography variant="body1">{theaterName}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: 2 }}>
                            This is your ticket
                        </Typography>
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
