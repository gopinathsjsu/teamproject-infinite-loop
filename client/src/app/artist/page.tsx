"use client";
import * as React from "react";
import dayjs from "dayjs";
import Backdrop from "@mui/material/Backdrop";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const crew_names = [
  "Director",
  "Producer",
  "Music Director",
  "Screenwriter",
  "Cinematographer",
  "Editor",
  "Art Director",
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TransitionsModal() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange2 = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [age, setAge] = React.useState("");

  const handleChange1 = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              ...style, // Your existing styles
              display: "flex", // Ensures flexbox layout
              justifyContent: "center", // Centers horizontally
              alignItems: "center", // Centers vertically
              // Full width of the parent
            }}
          >
            <Stack direction="column" spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  src="/broken-image.jpg"
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  sx={{ width: 200 }}
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Box>
              <TextField
                sx={{ width: 330 }}
                id="outlined-basic"
                label="Full Name"
                required
                variant="outlined"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker sx={{ width: 330 }} label="Date of Birth" />
                </DemoContainer>
              </LocalizationProvider>
              <div>
                <FormControl sx={{ m: 1, width: 100 }}>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Gender"
                    onChange={handleChange1}
                  >
                    <MenuItem value={10}>Male</MenuItem>
                    <MenuItem value={20}>Female</MenuItem>
                    <MenuItem value={30}>Other</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 200 }}>
                  <InputLabel id="demo-simple-select-label">
                    Artist Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Artist Category"
                    onChange={handleChange1}
                  >
                    <MenuItem value={10}>Cast</MenuItem>
                    <MenuItem value={20}>Crew</MenuItem>
                    <MenuItem value={30}>Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ m: 1, width: 330 }}>
                  <InputLabel id="demo-multiple-chip-label">
                    Profession{" "}
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange2}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {crew_names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <Button variant="contained" endIcon={<SendIcon />}>
                Submit
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
