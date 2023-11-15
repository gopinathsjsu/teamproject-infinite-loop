import React from 'react';

const App: React.FC = () => {
  const movie = {
    title: 'Jigarthanda Double X',
    languages: ['Tamil', 'Telugu', 'Hindi', 'Kannada'],
    duration: '2h 52m',
    genres: ['Action', 'Comedy', 'Period'],
    releaseDate: '10 Nov, 2023',
    description: 'Karthik, an aspiring filmmaker finds a producer who is willing to make his film on one condition - that it should be a fierce gangster flick. Due to this, Karthik decides to take inspiration from a real-life gangster, Karthik comes to the temple town of Madurai along with his friend Ooruni for research on thugs.They come to know of the ruthless gangster and a terror in that area Assault Sethu. Karthik takes the help of Kayal and her mother who cook food for Sethu and his henchmen. He also pretends to be in love with the young girl. As he embarks on his task what follows is a commercial cocktail of action, humor and thrills. How Karthik comes out of this tricky web is the rest of the story',
    backgroundPoster: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/jigarthanda-double-x-et00359702-1699446701.jpg', // Add your background poster path here
    trailerLink: 'https://youtu.be/uaqz9v6HdKs?si=V8qc0VSBQpKc75YO', // Add your YouTube video id here
  };
  const dates = ['Tue 14', 'Wed 15', 'Thu 16', 'Fri 17', 'Sat 18'];

    // Sample data for theater times
  const cinemas = [
    {
      name: "Sandhya Theatre RGB Laser Atmos -Madivala",
      times: [
        { showtime: "04:00 PM", format: "2D", availability: "available" },
        { showtime: "10:00 PM", format: "2D", availability: "fast-filling" },
      ],
    },
    {
      name: "Sri Srinivasa Chitramandira, SG Palya",
      times: [
        { showtime: "07:00 PM", format: "2D", availability: "almost-full" },
        { showtime: "10:00 PM", format: "2D", availability: "available" },
      ],
    },
    // ... add more cinema data as needed
  ];

  const getDateButtonClass = (availability: string) => {
    switch (availability) {
      case "fast-filling":
        return "bg-orange-200 text-orange-800";
      case "almost-full":
        return "bg-red-200 text-red-800";
      default:
        return "bg-green-200 text-green-800";
    }
    };
  // Define the background style
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${movie.backgroundPoster})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const cast = [
    { name: 'Actor Name 1', character: 'Character Name 1' },
    { name: 'Actor Name 2', character: 'Character Name 2' },
    // ... other cast members
  ];
  
  const crew = [
    { name: 'Director Name', role: 'Director' },
    { name: 'Producer Name', role: 'Producer' },
    // ... other crew members
  ];

  return (
    <div>
    <div className='h-screen' style={{ ...backgroundStyle, fontFamily: 'Arial, sans-serif', color: '#fff', position: 'relative', padding: '0', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
      <div style={{ maxWidth: '300px', marginBottom: '20px', marginLeft: '20px' }}>
        <div style={{ backgroundColor: '#000', borderRadius: '10px', overflow: 'hidden' }}>
          <iframe
            title="Movie Trailer"
            width="100%"
            height="169" // 16:9 aspect ratio
            src="https://www.youtube.com/embed/uaqz9v6HdKs" // Ensure this is the correct embed URL
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

        </div>
      </div>
    </div>
    <div>
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0)', borderRadius: '10px', padding: '20px', flexGrow: 1 }}>
        {/* Content goes here */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>{movie.title}</h1>   <button style={{ padding: '10px', fontSize: '16px' }}>Share</button>
        </div>
        <div style={{ display: 'flex', marginTop: '20px' }}>
          {/* Movie Details */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{movie.releaseDate}</span>
            </div>
            <div>
              <span style={{ marginLeft: '2px', fontSize: '24px' }}>{movie.languages.join(', ')} | {movie.duration} | UA </span>
            </div>
            <div>
              <span style={{ marginLeft: '2px', fontSize: '16px' }}>{movie.genres.join(', ')}</span>
            </div>
            <div>
            <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#f00', color: '#fff' }}>Book tickets</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style={{ maxWidth: '1200px', marginRight: '20px',padding: '20px'}}>
        <div style={{borderRadius: '10px', overflow: 'hidden' }}>
          <h1 className="text-2xl font-bold mb-3">About the movie</h1>
          <p>{movie.description}</p>
        </div>
    </div>
    <div>
  <div style={{ margin: '20px 0', padding: '20px' }}>
    <h1 className="text-2xl font-bold mb-3">Cast</h1>
    <ul>
      {cast.map((actor, index) => (
        <li key={`cast-${index}`}>
          <strong>{actor.name}</strong> as {actor.character}
        </li>
      ))}
    </ul>
  </div>
  <div style={{ margin: '20px 0', padding: '20px' }}>
  <h1 className="text-2xl font-bold mb-3">Crew</h1>
    <ul>
      {crew.map((member, index) => (
        <li key={`crew-${index}`}>
          <strong>{member.role}:</strong> {member.name}
        </li>
      ))}
    </ul>
  </div>
      {/* Cinema listings */}
      <div className="container mx-auto px-4 py-8">
        {/* Date and filter controls */}
        <div className="flex justify-between items-center mb-8">
        <div className="space-x-2">
            {/* Date filters */}
            {dates.map((date, index) => (
              <button key={index} className="border rounded px-4 py-2 bg-gray-200 hover:bg-gray-300">
                {date}
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            {/* Filter dropdowns */}
            <select className="border rounded px-4 py-2 bg-white shadow appearance-none">
              {movie.languages.map((language, index) => (
                <option key={index} value={language}>{language}</option>
              ))}
            </select>
            <select className="border rounded px-4 py-2 bg-white shadow appearance-none">
              <option>Format</option>
              {/* ... other format options */}
            </select>
            <select className="border rounded px-4 py-2 bg-white shadow appearance-none">
              <option>Showtime</option>
              {/* ... other showtime options */}
            </select>
          </div>
        </div>

        {/* Cinema listings */}
        {cinemas.map((cinema, index) => (
          <div key={index} className="bg-white shadow rounded p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">{cinema.name}</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              {cinema.times.map((time, timeIndex) => (
                <button key={timeIndex} className={`px-4 py-1 rounded ${getDateButtonClass(time.availability)} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-600`}>
                  {time.showtime} <span className="ml-1">{time.format}</span>
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
              <button className="text-blue-600 hover:text-blue-700">Get Directions</button>
              <button className="text-blue-600 hover:text-blue-700">More Info</button>
            </div>
          </div>
        ))}
      </div>

      {/* ...rest of your code... */}
    </div>
    </div>
  );
};

export default App;