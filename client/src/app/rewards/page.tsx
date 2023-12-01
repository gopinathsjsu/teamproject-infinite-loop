'use client'
import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Paper, Grid, Card, CardContent, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from 'next/navigation';
import Parallax from './parallax/page';
import useStore from '@/src/store';
import { getDataFromEndPoint } from '@/src/lib/backend-api';



// Styled components with theme
const BenefitsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const CheckmarkIcon = styled(CheckIcon)(({ theme }) => ({
  color: theme.palette.success.main,
}));

const JoinButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.getContrastText(theme.palette.primary.main),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const MemberBenefitsSection = () => {
  const benefits = [
    "Price Per Month",
    "Earn 1 Point for Every $1 Spent",
    "Redeem Points for Tickets and More Rewards",
    "Exclusive Member Offers",
    "Extra Discount Tuesday Savings",
    "Special Birthday Treat",
    "1 Ticket Per Month",
    "20% Off Concessions",
    "Waived Online Fees",
    "Unused Ticket Credits Roll Over",
    "Member Pricing for Additional Tickets",
    "Member Access to Screenings and Advance Tickets",
  ];

  // This should be determined based on your actual data
  const tierBenefits: any = {
    movieClub: [
      "Price Per Month",
      "Earn 1 Point for Every $1 Spent",
      "Redeem Points for Tickets and More Rewards",
      "Exclusive Member Offers",
      "Extra Discount Tuesday Savings",
      "Special Birthday Treat",
      "1 Ticket Per Month",
      "20% Off Concessions",
      "Waived Online Fees",
      "Unused Ticket Credits Roll Over",
      "Member Pricing for Additional Tickets",
      "Member Access to Screenings and Advance Tickets",
    ],
    movieFan: [
      "Price Per Month",
      "Earn 1 Point for Every $1 Spent",
      "Redeem Points for Tickets and More Rewards",
      "Exclusive Member Offers",
      "Extra Discount Tuesday Savings",
      "Special Birthday Treat",
    ],
  };

  const tierIncludesBenefit = (tier: string, benefit: string) => {
    return tierBenefits[tier]?.includes(benefit) || false;
  };

  return (
    <BenefitsContainer>
      <Typography variant="h5" gutterBottom>
        Movie-Lover, Select Your Tier
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Benefits</TableCell>
              <TableCell align="center">Movie Club</TableCell>
              <TableCell align="center">Movie Fan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {benefits.map((benefit, index) => (
              <TableRow key={index}>
                <TableCell>{benefit}</TableCell>
                <TableCell align="center">{tierIncludesBenefit('movieClub', benefit) && <CheckmarkIcon />}</TableCell>
                <TableCell align="center">{tierIncludesBenefit('movieFan', benefit) && <CheckmarkIcon />}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BenefitsContainer>
  );
};

const StyledCard = styled(Card)({
  backgroundColor: '#333', // Dark background color
  color: 'white', // White text color
  margin: '1rem',
  padding: '1rem',
});

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const PriceTag = styled('div')({
  backgroundColor: 'red',
  padding: '0.5rem 1rem',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
});

const BenefitDescription = styled(Typography)({
  fontSize: '0.8rem',
  fontWeight: 'normal',
});

const LinearProgressWithLabel = (props: any) => (
  <Box display="flex" alignItems="center">
    <Box width="100%" mr={1}>
      <LinearProgress variant="determinate" {...props} />
    </Box>
    <Box minWidth={35}>
      <Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
    </Box>
  </Box>
);

const RewardsProgress = ({ points, goal }: { points: any, goal: any }) => {
  const progress = (points / goal) * 100;

  return (
    <Box padding={3}>
      <Typography variant="h6">Get Rewarded</Typography>
      <LinearProgressWithLabel value={progress} />
      <Typography>Your Points: {points}</Typography>
    </Box>
  );
};

const RewardsPage = () => {
  const store: any = useStore();
  const router = useRouter();
  const totalPoints = 200;
  const goalPoints = 280;
  const [points, setPoints] = useState("");
  const primeUrl = `http://ec2-3-101-12-15.us-west-1.compute.amazonaws.com/api/payment/prime/checkout_sessions/${store.user.user_id}`;
  async function getRewards() {
    const result = await getDataFromEndPoint("", `user/getRewards/${store.user.user_id}`, "GET")
    console.log(result);
    setPoints(result.data);
    console.log(points)
  }
  async function joinNow() {
    const response = await getDataFromEndPoint('', `payment/prime/checkout_sessions/${store.user.user_id}`, 'GET');
    console.log(response);
  }
  useEffect(() => {
    getRewards();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Parallax />

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <StyledCard>
            <StyledCardContent>
              <PriceTag>$8.99/month</PriceTag>
              <BenefitDescription>One 2D ticket per month*</BenefitDescription>
              <BenefitDescription>Unused tickets roll over</BenefitDescription>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={4}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant='h5'>Rewards</Typography>
              {points ? <PriceTag>{points}</PriceTag> : <PriceTag>Points</PriceTag>}
              <BenefitDescription>Points</BenefitDescription>
              <BenefitDescription></BenefitDescription>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={4}>
          <StyledCard>
            <StyledCardContent>
              <PriceTag>NO ONLINE FEES</PriceTag>
              <BenefitDescription>Waived online fees</BenefitDescription>
              <BenefitDescription>Add-on tickets for $8.99</BenefitDescription>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>
      {/* <RewardsProgress points={totalPoints} goal={goalPoints} /> */}
      <MemberBenefitsSection />
      {!store.user.is_prime &&
        <form action={primeUrl} method='GET'>
          <JoinButton type="submit" variant="contained">Join Now</JoinButton>
        </form>
      }
    </Box>
  );
};

export default RewardsPage;
