"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { getDataFromEndPoint } from "@/src/lib/backend-api";
import { Seats } from "@/src/lib/types";
import styles from "./Seats.module.scss";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dayjs from "dayjs";
import { loadStripe } from "@stripe/stripe-js";
import useStore from '@/src/store';

const stripePromise = loadStripe(
  "pk_test_51OEgQqA475w0fpJudMi36tfpe04jdRxLTraIo1nwDrPcvgdEhXz77lWWfloifqjrI7UsggP5JppqQvU1fg6hZsuB00ibyRUIcB"
);

const schema = zod.object({
  date: zod
    .date()
    .min(new Date("1900-01-01"), "Date is required")
    .or(zod.string().nonempty("Date is required")),
  theater: zod.string().min(1, "Theater is required"),
  screen: zod.string().min(1, "Screen is required"),
  timing: zod.string().min(1, "Select at least one timing"),
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function addScreen() {
  const { movieName } = useParams();
  const searchParams = useSearchParams()
  const [editable, setEditable] = useState<boolean>(true);
  const [theaters, setTheaters] = useState<any[]>([]);
  const [screens, setScreens] = useState<any[]>([]);
  const [timings, setTimings] = useState<any[]>([]);
  const [cost, setCost] = useState(0);
  const [title, setTitle] = useState();
  const [releaseDate, setReleaseDate] = useState<any>();
  const [endDate, setEndDate] = useState();
  const [open, setOpen] = useState(false);
  const [seatDetails, setSeatDetails] = useState<Seats>({});
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [discountRates, setDiscountRates] = useState<any>(null);
  const [key, setKey] = useState<string>("");
  const [isPatched, setIsPatched] = useState<boolean>(false);
  const [rewardsEnabled, setRewardsEnabled] = useState<string>("false")
  const checkoutURL = `http://localhost:8080/payment/checkout_sessions/${key}/${rewardsEnabled}`;
  const [rewards, setRewards] = useState<number>(0);
  const store: any = useStore();
  const [bookingError, setBookingError] = useState<string | null>(null);


  useEffect(() => {
    if (!isPatched) {
      const theaterId = searchParams.get('theater');
      const screenId = searchParams.get('screen');
      const timing = searchParams.get('time');

      if (theaterId) {
        setValue("theater", theaterId);
        const selectedTheater = theaters.find((theater) => theater.id === theaterId);
        if (selectedTheater) {
          setScreens(selectedTheater.screen_details);
        }
        if (screenId && screens.length > 0) {
          setValue("screen", screenId);
          const selectedScreen = screens.find((screen) => screen.id === screenId);
          if (selectedScreen) {
            setTimings(selectedScreen.show_timings);
          }
          if (timing) {
            setValue("timing", timing);
            setIsPatched(true);
          }
        }
      }
    }
  }, [searchParams, theaters, screens]);

  useEffect(() => {
    clearSelectedSeats();
    const fetchData = async () => {
      try {
        const response: any = await fetch(
          `http://localhost:8080/theater/getAllTheatersScreens/${movieName}`
        );
        const res = await response.json();
        setTitle(res.data.movieName);
        setTheaters(res.data.theaters);
        setEndDate(res.data.endDate);
        const currentDate = Dayjs(new Date());
        const openingDate =
          currentDate > Dayjs(res.data.releaseDate)
            ? currentDate
            : Dayjs(res.data.releaseDate);
        setReleaseDate(openingDate);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDiscountRates = async () => {
      try {
        const response: any = await fetch(`http://localhost:8080/discount/all`);
        const res = await response.json();
        setDiscountRates(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRewardPoint = async () => {
      try {
        const response: any = await fetch(`http://localhost:8080/user/getRewards/${store.user.user_id}`);
        const res = await response.json();
        setRewards(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    fetchDiscountRates();
    fetchRewardPoint();
  }, []);

  //SEATS CODE
  const clearSelectedSeats = () => {
    let newMovieSeatDetails = { ...seatDetails };
    for (let key in seatDetails) {
      seatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          seatDetails[key][seatIndex] = 0;
        }
      });
    }
    setSeatDetails(newMovieSeatDetails);
  };

  const changeEditable = () => {
    setEditable(!editable);
  };

  async function validateFileds() {
    trigger();
    const values = getValues();
    if (
      values.date == null ||
      values.screen == "" ||
      values.theater == "" ||
      values.timing == ""
    ) {
      return;
    } else {
      const data = {
        theater_id: values.theater,
        screen_id: values.screen,
        movie_id: movieName,
        time: values.timing,
        value: values.date,
      };
      const response = await getDataFromEndPoint(
        data,
        "screen/getScreenLayout",
        "POST"
      );
      setSelectedSeats([]);
      setSeatDetails({ ...response.data.seatArray });
      setCost(response.data.cost);
      changeEditable();
    }
  }

  const {
    getValues,
    trigger,
    control,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(schema),
  });

  const getErrorMessage = (error: any) => {
    return error && typeof error.message === "string" ? error.message : "";
  };

  //SEATS CODE
  const getSeatWithOffset = (key: any, rowIndex: number, seatValue: number) => {
    let offset = 0;
    let returnValue = "";
    seatDetails[key].forEach((value, index) => {
      if (value === seatValue && index === rowIndex) {
        returnValue = `${key}${index + 1 - offset}`;
      } else if (value === 3) {
        offset++;
      }
    });
    return returnValue;
  };

  //SEATS CODE
  const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {
    if (editable) return;
    let tempSelectedSeats = selectedSeats;
    if (seatDetails) {
      if (seatValue === 1 || seatValue === 3) {
        return;
      } else if (seatValue === 0) {
        if (selectedSeats.length >= 8) return;
        seatDetails[key][rowIndex] = 2;
        const seatValue = getSeatWithOffset(key, rowIndex, 2);
        tempSelectedSeats.push(seatValue);
      } else {
        seatDetails[key][rowIndex] = 0;
        const seatValue = getSeatWithOffset(key, rowIndex, 0);
        const index = tempSelectedSeats.indexOf(seatValue);
        if (index > -1) tempSelectedSeats.splice(index, 1);
      }
    }
    setSelectedSeats(tempSelectedSeats);
    setSeatDetails({ ...seatDetails });
  };

  //SEATS CODE
  const getClassNameForSeats = (seatValue: number) => {
    let dynamicClass;
    if (editable) {
      dynamicClass = styles.disableSeat;
      if (seatValue == 3) {
        dynamicClass = styles.seatBlocked;
      }
      return `${styles.seats} ${dynamicClass}`;
    }
    if (seatValue === 0) {
      // Not booked
      dynamicClass = styles.seatNotBooked;
    } else if (seatValue === 1) {
      // booked
      dynamicClass = styles.seatBooked;
    } else if (seatValue === 2) {
      // Seat Selected
      dynamicClass = styles.seatSelected;
    } else {
      // Seat Blocked
      dynamicClass = styles.seatBlocked;
    }
    return `${styles.seats} ${dynamicClass}`;
  };

  //SEATS CODE
  const RenderSeats = () => {
    let seatArray = [];
    for (let key in seatDetails) {
      let index = 0;
      let colValue = seatDetails[key].map((seatValue, rowIndex) => (
        <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
          {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
          {seatValue != 3 ? (
            <span
              className={getClassNameForSeats(seatValue)}
              onClick={() => onSeatClick(seatValue, rowIndex, key)}
            >
              {(index = index + 1)}
            </span>
          ) : (
            <span className={getClassNameForSeats(seatValue)}>{1}</span>
          )}
          {seatDetails && rowIndex === seatDetails[key].length - 1 && (
            <>
              <br />
              <br />
            </>
          )}
        </span>
      ));
      seatArray.push(colValue);
    }
    return <div className={styles.seatsLeafContainer}>{seatArray}</div>;
  };

  const getReqSeatDeatils = () => {
    let seatArray: any = {};
    for (let key in seatDetails) {
      let column = [];
      for (let i = 0; i < seatDetails[key].length; i++) {
        if (seatDetails[key][i] === 2) {
          column.push(1);
        } else {
          column.push(seatDetails[key][i]);
        }
      }
      seatArray[key] = column;
    }
    return seatArray;
  };

  async function onSubmit() {
    let data = getValues();
    let dayOfWeek = data.date.day();
    console.log(dayOfWeek);
    const timeStamp = data.timing.split(" ")[1];
    let time = null;
    if (timeStamp === "pm") {
      time = data.timing.split(":")[0];
      time = (Number(time) + 12).toString();
    } else {
      time = data.timing.split(":")[0];
    }
    const key = data.theater + "-" + data.screen + "-" + time + "-" + data.date;
    let discount = dayOfWeek.toString() === "2" ? discountRates.tuesday : null;
    if (time >= 18) discount = discountRates.night_time;
    const totalPrice = discount != null ? cost * selectedSeats.length * (1 - discount * 0.01) : cost * selectedSeats.length;
    data["user_id"] = store.user ? store.user.user_id : null;
    data["discount"] = dayOfWeek.toString() === "2" ? "tuesday" : ((time >= 18) ? "night_time": null);
    data["screenLayout"] = getReqSeatDeatils();
    data["seatSelected"] = selectedSeats;
    data["movie_id"] = movieName;
    data["key"] = key;
    data["price"] = cost;
    data["rewards"] = rewards;
    data["is_prime"] = false;
    
    // Attempt to store ticket booking details
    const reqData = await getDataFromEndPoint(
      data,
      "payment/storeTicketBookingDetails",
      "POST"
    );
    
    // Check the response status
    if (reqData.status === 200) {
      // Construct order details for a successful booking
      const tempOrderDetails = {
        ticketsBooked: selectedSeats.join(","),
        pricePerTicket: cost,
        discount: dayOfWeek.toString() === "2" ? `Tuesday's Discount ${discount}%` : (time >= 18 ? `Night Show Discount ${discount}%` : '0'),
        totalPrice: totalPrice,
      };
      setOrderDetails(tempOrderDetails);
      setKey(key);
      setBookingError(null); // Clear any previous errors
      setOpen(true); // Open the modal for a successful booking
    } else if (reqData.status === 400) {
      // Handle the error scenario
      setBookingError(reqData.message); // Set the error message
      setOpen(true); // Open the modal to show the error
    }
    // You may want to handle other status codes as well
  }
  

  function theaterChange(event: any) {
    theaters.forEach((theater) => {
      if (theater.id == event.target.value) {
        setValue('screen',null);
        setValue('timing',null);
        setScreens(theater.screen_details);
        setTimings([]);
      }
    });
  }

  function screenChange(event: any) {
    screens.forEach((screen) => {
      if (screen.id == event.target.value) {
        setTimings(screen.show_timings);
      }
    });
  }

  function handleRewards(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setRewardsEnabled("true");
    } else {
      setRewardsEnabled("false");
    }
  }

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth={false}
        style={{ marginLeft: "0px", marginRight: "0px", marginTop: "6%" }}
      >
        <form>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4">Book Ticket - {title}</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid
              sx={{ display: "flex", justifyContent: "center", mt: "16px" }}
              item
              xs={12}
              md={12}
              lg={3}
            >
              <Controller
                name="date"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {!editable ? (
                      <TextField
                        {...field}
                        label="SelectDate"
                        value={field.value ? Dayjs(field.value).format('MM/DD/YYYY') : ''}
                        disabled={!editable}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                          shrink: Boolean(field.value),
                        }}
                      />
                    ) : (
                      <DatePicker
                        disabled={!editable}
                        minDate={Dayjs(releaseDate)}
                        maxDate={Dayjs(endDate)}
                        sx={{ width: "100%" }}
                        label="Select Date"
                        {...field}
                      />
                    )
                    }
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              <Controller
                name="theater"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <FormControl
                    disabled={!editable}
                    fullWidth
                    margin="normal"
                    error={!!errors.theater}
                  >
                    <InputLabel>Theater</InputLabel>
                    <Select
                      {...field}
                      label="Theater"
                      onChange={(event) => {
                        field.onChange(event);
                        theaterChange(event);
                      }}
                      value={field.value || ""}
                    >
                      {theaters.map((theater) => (
                        <MenuItem key={theater.id} value={theater.id}>
                          {theater.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText id="component-error-text">
                      {getErrorMessage(errors.theater)}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              <Controller
                name="screen"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <FormControl
                    disabled={!editable}
                    fullWidth
                    margin="normal"
                    error={!!errors.screen}
                  >
                    <InputLabel>Screen</InputLabel>
                    <Select
                      {...field}
                      label="Screen"
                      onChange={(event) => {
                        field.onChange(event);
                        screenChange(event);
                      }}
                      value={field.value || ""}
                    >
                      {screens.map((screen) => (
                        <MenuItem key={screen.id} value={screen.id}>
                          {screen.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText id="component-error-text">
                      {getErrorMessage(errors.screen)}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              <Controller
                name="timing"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl
                    disabled={!editable}
                    fullWidth
                    margin="normal"
                    error={!!errors.timing}
                  >
                    <InputLabel>Timing</InputLabel>
                    <Select {...field} label="Timing">
                      {timings.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText id="component-error-text">
                      {getErrorMessage(errors.timing)}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12} lg={12}>
              <Grid container justifyContent="center" spacing={2}>
                {editable ? (
                  <Box gap={2} my={4}>
                    <Button variant="contained" onClick={validateFileds}>
                      Apply Changes
                    </Button>
                  </Box>
                ) : (
                  <Box gap={2} my={4}>
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="outlined"
                      onClick={changeEditable}
                    >
                      Change Theater
                    </Button>
                    {selectedSeats.length !== 0 && (
                      <Button
                        variant="contained"
                        onClick={() => {
                          onSubmit();
                        }}
                      >
                        Book Ticket Pay ${selectedSeats.length * (cost || 0)}
                      </Button>
                    )}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
        <>
          <div className={styles.seatsContainer}>
            {seatDetails ? (
              <RenderSeats />
            ) : (
              <div> Select Theater and Apply Changes to Select Layout </div>
            )}
            <div className={styles.cont_screen}>
              <div className={styles.screen}>
                <span className={styles.screen_text}>SCREEN</span>
              </div>
            </div>
          </div>
        </>
      </Container>
      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "600px",
          maxWidth: "1000px",
          height: "400px",
        }}>
              {bookingError && (
      <>
      <img 
        src="https://img.freepik.com/vektoren-premium/popcorn-cartoon-maskottchen-weinen-mit-einem-taschentuch_193274-2025.jpg?w=2000" 
        alt="Sad popcorn"
        style={{ width: '150px', height: 'auto', marginBottom: '16px' }}
      />
      <Typography color="error" variant="h6" component="h2" sx={{ mt: 2, mb: 2, fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
        Oops 😔 {bookingError}
      </Typography>
    </>
                )}
          {!bookingError && (
          <form action={checkoutURL} method="POST">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">{title}</Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox onChange={handleRewards} />} label={"Apply Your Rewards: " + rewards} />
              </FormGroup>
            </Box>
            <TableContainer component={Paper} style={{ boxShadow: "none" }}>
              <Table sx={{ minWidth: 550 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tickets Booked
                    </TableCell>
                    <TableCell align="right">{orderDetails?.ticketsBooked}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Cost Per Ticket
                    </TableCell>
                    <TableCell align="right">${orderDetails?.pricePerTicket}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Discount
                    </TableCell>
                    <TableCell align="right">{orderDetails?.discount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Total Price
                    </TableCell>
                    <TableCell align="right">
                      ${orderDetails?.totalPrice}
                    </TableCell>
                  </TableRow>
                  {rewardsEnabled === "true" &&
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Final Price After Rewards
                      </TableCell>
                      <TableCell align="right">
                        ${orderDetails?.totalPrice - (0.1 * rewards)}
                      </TableCell>
                    </TableRow>
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              type="submit"
              sx={{ mt: 5 }}
              variant="contained"
            >
              checkout
            </Button>

          </form>
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
}
