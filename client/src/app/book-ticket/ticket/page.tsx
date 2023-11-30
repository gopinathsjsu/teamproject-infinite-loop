import React from 'react'
import '../../../app/styles/home.module.css'
import TicketCard from '../../components/Ticket/ticketCard';
function App() {
    return (
        <>
            <TicketCard name='hello' movieName='Animal' showTime='9:00 AM' seatNo='A1 A2 A3' theaterName='Cinemark' qrLink='https://hexdocs.pm/qr_code/docs/qrcode.svg' />
        </>
    )
}

export default App;