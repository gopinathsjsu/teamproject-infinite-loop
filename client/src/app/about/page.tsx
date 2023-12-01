"use client";
import React from "react";
import { Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./about.css";

const PREFIX = "TeamSection";

const classes = {
  root: `${PREFIX}-root`,
  heading: `${PREFIX}-heading`,
  card: `${PREFIX}-card`,
  media: `${PREFIX}-media`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },

  [`& .${classes.heading}`]: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
    fontweight: "bold",
    textTransform: 'uppercase',
    fontWeight: 600, 
    background: '-webkit-linear-gradient(45deg, #a1c4fd 30%, #c2e9fb 90%)', // Gradient effect


  },

  [`& .${classes.card}`]: {
    width: 300,
    height: 400,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.shape.borderRadius, // This adds border-radius
    boxShadow: theme.shadows[5], // This adds shadow, you can adjust the level [1-24]
    transition: "transform 0.3s ease-in-out, boxShadow 0.3s ease-in-out", // Smooth transition for hover effect
    "&:hover": {
      transform: "translateY(-5px)", // Moves the card up slightly on hover
      boxShadow: theme.shadows[20], // Increases the shadow depth on hover for a more pronounced 3D effect
    },
  },

  [`& .${classes.media}`]: {
    height: 300,
    objectFit: "cover",
  },
}));

const teamMembers = [
  {
    name: "GOPINATH VINODH",
    title: "PROJECT MANAGER",
    imageUrl: "https://sjsu.instructure.com/images/thumbnails/52740250/ZYApA8YLpG1CY5md5pDd3sVDCerM85wFMU64nqaL", // Replace with path to image
  },
  {
    name: "DEEKSHITH",
    title: "Developer",
    imageUrl: "https://box-office-team-infinite-loop.s3.us-west-1.amazonaws.com/WhatsApp+Image+2023-12-01+at+3.10.01+AM.jpeg", // Replace with path to image
  },
  {
    name: "MAHENDRA",
    title: "Developer",
    imageUrl: "https://box-office-team-infinite-loop.s3.us-west-1.amazonaws.com/Snapseed.jpg", // Replace with path to image
  },
  {
    name: "SRAVAN",
    title: "Developer",
    imageUrl: "https://box-office-team-infinite-loop.s3.us-west-1.amazonaws.com/IMG_0226+3.jpg", // Replace with path to image
  },
  {
    name: "YESHVANTH ",
    title: "Developer",
    imageUrl: "https://box-office-team-infinite-loop.s3.us-west-1.amazonaws.com/IMG20231102150745.jpg", // Replace with path to image
  },
  

  // ... Add more team members as needed
];

const TeamSection = () => {
  return (
    <Root className={classes.root}>
      <Typography variant="h4" className={classes.heading}>
        Meet  the  Team
      </Typography>

      {/* Container for the first row with a single card centered */}
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardMedia
              component="img"
              className={classes.media}
              image={teamMembers[0].imageUrl}
              alt={teamMembers[0].name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                {teamMembers[0].name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {teamMembers[0].title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Container for the second row with four cards, with added top margin */}
      <Grid container spacing={4} style={{ marginTop: "2rem" }}>
        {" "}
        {/* Adjust the marginTop value as needed */}
        {teamMembers.slice(1).map((member) => (
          <Grid item xs={12} sm={6} md={3} key={member.name}>
            <Card className={classes.card}>
              <CardMedia
                component="img"
                className={classes.media}
                image={member.imageUrl}
                alt={member.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {member.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {member.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Root>
  );
};

export default TeamSection;
