"use client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useParams, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Grid,
  Typography,
  styled,
  Chip,
  IconButton,
  makeStyles,
  Link,
} from "@mui/material";

interface CastAndCrewMember {
  name: string;
  profession: string;
  profile_url: string;
  // Include other properties as needed
}

interface Movie {
  title: string;
  languages: string[];
  run_time: string;
  genres: string[];
  release_date: string;
  description: string;
  poster_url: string;
  banner_url: string;
  trailer_url: string;
  format: string;
}

const defaultMovie: Movie = {
  title: "",
  languages: [],
  run_time: "",
  genres: [],
  release_date: "",
  description: "",
  poster_url: "",
  banner_url: "",
  trailer_url: "",
  format: "",
};
const App: React.FC = () => {
  const { movieName } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<Movie>(defaultMovie);
  const [castData, setCastData] = useState<CastAndCrewMember[]>([]);
  const [crewData, setCrewData] = useState<CastAndCrewMember[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/movie/${movieName}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data.movie);
        setCastData(data.cast);
        setCrewData(data.crew);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);
  // const movie = {
  //   title: "Jigarthanda Double X",
  //   languages: ["Tamil", "Telugu", "Hindi", "Kannada"],
  //   duration: "2h 52m",
  //   genres: ["Action", "Comedy", "Period"],
  //   releaseDate: "10 Nov, 2023",
  //   description:
  //     "Karthik, an aspiring filmmaker finds a producer who is willing to make his film on one condition - that it should be a fierce gangster flick. Due to this, Karthik decides to take inspiration from a real-life gangster, Karthik comes to the temple town of Madurai along with his friend Ooruni for research on thugs.They come to know of the ruthless gangster and a terror in that area Assault Sethu. Karthik takes the help of Kayal and her mother who cook food for Sethu and his henchmen. He also pretends to be in love with the young girl. As he embarks on his task what follows is a commercial cocktail of action, humor and thrills. How Karthik comes out of this tricky web is the rest of the story",
  //   backgroundPoster:
  //     "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/jigarthanda-double-x-et00359702-1699446701.jpg", // Add your background poster path here
  //   trailerLink: "https://www.youtube.com/watch?v=uaqz9v6HdKs", // Add your YouTube video id here
  // };
  // const dates = ["Tue 14", "Wed 15", "Thu 16", "Fri 17", "Sat 18"];

  // Sample data for theater times
  // const cinemas = [
  //   {
  //     name: "Sandhya Theatre RGB Laser Atmos -Madivala",
  //     times: [
  //       { showtime: "04:00 PM", format: "2D", availability: "available" },
  //       { showtime: "10:00 PM", format: "2D", availability: "fast-filling" },
  //     ],
  //   },
  //   {
  //     name: "Sri Srinivasa Chitramandira, SG Palya",
  //     times: [
  //       { showtime: "07:00 PM", format: "2D", availability: "almost-full" },
  //       { showtime: "10:00 PM", format: "2D", availability: "available" },
  //     ],
  //   },
  //   // ... add more cinema data as needed
  // ];

  // const cast = [
  //   {
  //     name: "Aishwariya",
  //     role: "",
  //     imageurl:
  //       "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  //   },
  //   {
  //     name: "Mahesh Babu",
  //     role: "",
  //     imageurl:
  //       "https://upload.wikimedia.org/wikipedia/commons/9/9a/Mahesh_Babu_in_Spyder_%28cropped%29.jpg",
  //   },
  //   // ... other cast members
  // ];

  // const crew = [
  //   { name: "Raghu", role: "Director", imageurl: "" },
  //   { name: "Vamshi", role: "Producer", imageurl: "" },
  //   // ... other crew members
  // ];

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${movie.poster_url})`,
    // backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${poster.backgroundPoster})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    padding: "2rem", // top, right, bottom, left
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    minHeight: "75vh",
  };

  const contentStyle = {
    backgroundColor: "rgba(0, 0, 0, 0)", // Semi-transparent black background
    padding: "2rem", // Padding around the text
    maxWidth: "50%", // Takes up half of the container width
    color: "white", // Text color
    lineHeight: "1.4", // Line height for better readability
    marginBottom: "2rem", // Pushes the content up from the bottom
  };

  const videoOpts = {
    height: "140%", // Set the height of the video player
    width: "900px", // Set the width of the video player
    border: "none", // No border
    // borderRadius: "20px", // Rounded corners
    overflow: "hidden", // Prevents the content from spilling outside the border-radius
  };

  // Style for the container that will center the video
  const videoContainerStyle = {
    display: "flex", // Use flexbox for centering
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    height: "40vh", // Full viewport height to center within the page vertically
    width: "100%", // Ensure the container takes up the full width to center the video properly
  };

  const DateScrollContainer = styled("div")({
    display: "flex",
    overflowX: "auto", // Horizontal scroll
    gap: "0.5rem",
    marginBottom: "1rem",
    padding: "0.5rem",
    "&::-webkit-scrollbar": {
      display: "none", // Hide scrollbar for webkit browsers
    },
  });

  // const CinemaButton = styled(Button)({
  //   textTransform: "none",
  //   margin: "0.25rem",
  //   "&:hover": {
  //     backgroundColor: "#f50057", // Example hover color, adjust as needed
  //     color: "#fff",
  //   },
  // });

  function redirectToArtist(artist: any) {
    router.push(`/artist/${artist.id}`)
  }

  function redirectToBooking() {
    router.push(`/movies/${movieName}/buyTicket`);
  }

  const transparentChipStyle = {
    background: 'transparent',
    border: '1px solid #ffffff', // Add a border for better visibility
    marginRight: '4px', // Adjust spacing as needed
    color: '#ffffff', // Text color
  };

  return (
    <>
      <div>
      <div style={backgroundStyle}>
      <div style={contentStyle}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, fontSize: '80px' }} component="h1" gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, fontSize: '30px' }} gutterBottom>
          {new Date(movie.release_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, fontSize: '24px' }} gutterBottom>
          <Chip label={`Runtime: ${movie.run_time} min`} sx={transparentChipStyle} />
          <Chip label={`Languages: ${movie.languages}`} sx={transparentChipStyle} />
          <Chip label={`Format: ${movie.format}`} sx={transparentChipStyle} />
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, fontSize: '30px' }} gutterBottom>
          
          {movie.genres.map((genre, index) => (
            <Chip key={index} label={genre} sx={transparentChipStyle} />
          ))}
        </Typography>
      </div>
    </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
          }}
        >
        <Button
          onClick={redirectToBooking}
          variant="contained"
          style={{
            position: 'fixed', // Stick the button to the viewport
            bottom: '20px', // Distance from the bottom of the viewport
            right: '20px', // Distance from the right of the viewport
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
            width: "150px",
            height: "50px",
            zIndex: 1000, // Ensure it's above other elements
          }}
        >
          Buy Tickets
        </Button>

        </div>

        <Grid item xs={12} sm={6}>
          <Container
            maxWidth="lg"
            sx={{
              borderRadius: 10,
              overflow: "hidden",
              padding: 4,
              marginTop: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", mb: 2 }}
              gutterBottom
              style={{ fontSize: "40px" }}
            >
              About the movie
            </Typography>
            <Typography variant="body1" style={{ fontSize: "20px", textAlign: "justify" }}>
              {movie.description}
            </Typography>
            <div>
              <Typography
                variant="body1"
                padding="10px"
                paddingTop="20px"
                paddingBottom="85px"
                sx={{ fontWeight: "bold", mb: 2 }}
                style={{ fontSize: "40px" }}
              >
                Trailer of the movie
              </Typography>

              <div style={videoContainerStyle}>
              <iframe
                title="Movie Trailer"
                src={movie.trailer_url}
                style={videoOpts}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            </div>
          </Container>
        </Grid>

        <Container
          maxWidth="lg"
          sx={{ borderRadius: 2, overflow: "hidden", mt: 2, mb: 4 }}
        >
          <Typography
            variant="h5"
            component="div"
            paddingTop="50px"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Cast
          </Typography>
          <Grid container spacing={1}>
            {" "}
            {/* Reduced spacing between grid items */}
            {castData.map((cast, index) => (
              <Grid item key={`cast-${index}`} xs={6} sm={4} md={3} lg={2}>
                {" "}
                {/* Adjusted grid sizes for less space */}
                <Box sx={{ textAlign: "center" }}>
                  <Link onClick={() => redirectToArtist(cast)} variant="body2">
                    <Avatar
                      alt={cast.name}
                      src={cast.profile_url}
                      sx={{ width: 90, height: 90, margin: "auto", mb: 1 }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {cast.name}
                    </Typography>
                    <Typography variant="body2">{cast.profession}</Typography>
                  </Link>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container
          maxWidth="lg"
          sx={{ borderRadius: 2, overflow: "hidden", mt: 2, mb: 4 }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Crew
          </Typography>
          <Grid container spacing={1}>
            {" "}
            {/* Reduced spacing between grid items */}
            {crewData.map((crewMember, index) => (
              <Grid item key={`crew-${index}`} xs={6} sm={4} md={3} lg={2}>
                {" "}
                {/* Adjusted grid sizes for less space */}
                <Box sx={{ textAlign: "center" }}>
                  <Link onClick={() => redirectToArtist(crewMember)} variant="body2">
                    <Avatar
                      alt={crewMember.name}
                      src={crewMember.profile_url}
                      sx={{ width: 90, height: 90, margin: "auto", mb: 1 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {crewMember.profession}
                    </Typography>
                    <Typography variant="subtitle2">
                      {crewMember.name}
                    </Typography>
                  </Link>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default App;
