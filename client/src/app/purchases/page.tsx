import InnerPageContainer from "../components/dashboard/common/InnerPageContainer";
import React from 'react';

// Dummy ticket data
const tickets = [
  {
    date: "2022-06-30",
    time: "12:15",
    title: "Avengers: Endgame",
    cinema: "Metro INOX Cinema • Mumbai",
    seats: ["3-9", "4-9", "5-9"],
    barcode: "8plbPKsJE0zEbo5xNKM8",
    imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
    qrCodeUrl: "https://blog.tcea.org/wp-content/uploads/2022/05/qrcode_tcea.org-1.png" // Dummy QR code image URL
  },
  {
    date: "2022-06-12",
    time: "15:30",
    title: "Guntur Kaaram",
    cinema: "Metro INOX Cinema • Mumbai",
    seats: ["2-6", "3-6", "4-6"],
    barcode: "K8WJ1HKxKu18AxdjOGy6",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYWM0YTI2YTUtYmYwYy00M2I3LWFhMDQtNWQwN2QyYzM5YTJlXkEyXkFqcGdeQXVyMTUyNjIwMDEw._V1_FMjpg_UX1000_.jpg", // Dummy image URL for a larger movie poster
    qrCodeUrl: "https://cdn.shopify.com/app-store/listing_images/200eb847577e192c1dc21400be18c7c0/icon/CODUuOLS8vcCEAE=.png" // Dummy QR code image URL
  }
  // ... add more tickets as needed
];

const TicketsPage: React.FC = () => {
  return (
    <InnerPageContainer title="Purchases">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Recent Tickets</h1>
        <div className="grid grid-cols-1 gap-6">
          {tickets.map((ticket, index) => (
            <div key={index} className="border border-gray-300 p-6 rounded-lg flex flex-col md:flex-row items-center">
              <img src={ticket.imageUrl} alt="Movie Poster" className="mb-4 md:mb-0 md:mr-6 w-48 h-auto rounded-lg shadow-md" />
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-2">{ticket.title}</h3>
                <p className="text-gray-600 mb-1">{ticket.cinema}</p>
                <p className="text-gray-600 mb-1">{ticket.date} • {ticket.time}</p>
                <div className="text-gray-600 mb-3">
                  Seats: <span className="font-semibold">{ticket.seats.join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <img src={ticket.qrCodeUrl} alt="QR Code" className="w-20 h-20 mr-4 shadow-md" />
                  <span className="font-mono text-sm">{ticket.barcode}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InnerPageContainer>
  );
};

export default TicketsPage;
