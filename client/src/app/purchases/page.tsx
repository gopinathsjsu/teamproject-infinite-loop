import InnerPageContainer from "../components/dashboard/common/InnerPageContainer";
import React from 'react';

// Dummy ticket data
const tickets = [
  {
    date: "Wednesday, September 27, 2023",
    title: "Salaar: Part 1 - Ceasefire (Telugu with English Subtitles)",
    time: "11:30 am"
  },
  // ... add more dummy data as needed
  {
    date: "Sunday, August 27, 2023",
    title: "Gran Turismo: Based on a True Story",
    time: "12:55 pm"
  }
];

const TicketsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-3/4 pr-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Tickets & Purchases</h1>
          <section aria-labelledby="upcoming-tickets">
            <h2 className="font-semibold text-lg">Upcoming Tickets & Orders</h2>
            <p className="text-gray-600 my-4">You have no upcoming tickets associated with this account.</p>
          </section>
          <section aria-labelledby="past-tickets" className="mt-8">
            <h2 className="font-semibold text-lg mb-4">Past Tickets & Orders</h2>
            {tickets.map((ticket, index) => (
              <div key={index} className="mb-4 p-4 bg-white shadow rounded">
                <p className="font-semibold">{ticket.date}</p>
                <p>{ticket.title}</p>
                <p>{ticket.time}</p>
              </div>
            ))}
          </section>
        </div>
        <div className="lg:w-1/4 lg:pl-4 mt-8 lg:mt-0">
          <div className="p-4 bg-red-100 shadow rounded">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Food & Drink</h2>
            <p>Pick up your order at your theatre's designated concession counter or at pick-up rack using your confirmation number or QR code.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
