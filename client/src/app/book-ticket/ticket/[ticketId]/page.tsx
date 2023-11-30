'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from "next/navigation";
import TicketCard from '../../../components/Ticket/ticketCard';
import { getDataFromEndPoint } from '@/src/lib/backend-api';
import LoadingAnimation from '../../../containers/dashboard/loading/page';
import ReactToPrint from "react-to-print";
function App() {
    const [ticketData, setTicketData] = useState<any>(null);
    const { ticketId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    console.log(ticketId);
    useEffect(() => {
        const fetchTicketDetails = async () => {
            if (ticketId) {
                const response = await getDataFromEndPoint('', 'payment/getTicketData/' + ticketId, 'GET');
                const data = response.data;
                const mappedData = {
                    name: data.name,
                    movieName: data.movieName,
                    show_time: data.show_time,
                    seatNo: data.seat_ids.join(' '),
                    theaterName: data.theaterName,
                    qrLink: data.qr_code,
                    screenName: data.screen_id
                };
                setTicketData(mappedData);
            }
        };

        fetchTicketDetails();
    }, [ticketId]); // Dependency array includes ticketId to refetch if it changes

    if (!ticketData) {
        return <div>Loading...</div>; // or any other loading state
    }
    return (
        <>
            <TicketCard name={ticketData.name} movieName={ticketData.movieName} showTime={ticketData.show_time} seatNo={ticketData.seatNo} theaterName={ticketData.theaterName} qrLink={ticketData.qrLink} screenName={ticketData.screenName} />
        </>
    )
}

export default App;