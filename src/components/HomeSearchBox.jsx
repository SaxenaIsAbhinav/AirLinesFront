

import React, { useState, useEffect, useRef, useContext } from "react";
import {
  TextField,
  Autocomplete,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Menu,
  MenuItem,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import { FaChair, FaSearch } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { RiFlightTakeoffFill, RiFlightLandFill } from "react-icons/ri";
import { PiArmchairThin } from "react-icons/pi";
import { MdTravelExplore } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useAppContext } from "../context/AppContext";
import axios from 'axios';

const TEST_MODE = true;
const dummyAirports = [
  {
    id: "DEL",
    entityId: "95673498",
    name: "Indira Gandhi International",
    country: "India",
    title: "Indira Gandhi International",
    subtitle: "India",
  },
  {
    id: "RUH",
    entityId: "95673362",
    name: "Riyadh",
    country: "Saudi Arabia",
    title: "Riyadh",
    subtitle: "Saudi Arabia",
  },
  {
    id: "JFK",
    entityId: "94378945",
    name: "John F. Kennedy International",
    country: "USA",
    title: "John F. Kennedy International",
    subtitle: "USA",
  },
  {
    id: "LHR",
    entityId: "96348967",
    name: "Heathrow",
    country: "UK",
    title: "Heathrow",
    subtitle: "UK",
  },
  {
    id: "DXB",
    entityId: "92384723",
    name: "Dubai International",
    country: "UAE",
    title: "Dubai International",
    subtitle: "UAE",
  },
];
const dummyResponse = {
  flights: [{ /* dummy flight data */ }],
  filters: { /* dummy filters */ },
};

const HomeSearchBox = () => {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("oneway");
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [cabinClass, setCabinClass] = useState("economy");


  const [airportOptions, setAirportOptions] = useState(dummyAirports);

  const [travelers, setTravelers] = useState({ adults: 1, children: 0, infants: 0 });
  const [anchorEl, setAnchorEl] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelerAnchorEl, setTravelerAnchorEl] = useState(null);
  const debounceTimeout = useRef(null);
const {searchPayload, setSearchPayload ,fetchFlights} = useAppContext();
  const handleTravelerClick = (e) => setAnchorEl(e.currentTarget);
  const handleTravelerClose = () => setAnchorEl(null);

  const fetchAirports = (query, setter) => {
    if (true) {
      const filtered = dummyAirports.filter(
        (a) =>
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.id.toLowerCase().includes(query.toLowerCase())
      );
      setter(filtered);
    } else {
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout( async () => {
        try {
          const res = await fetch(`http://localhost:9555/api/airports?query=${query}`);
          const data = await res.json();
          setter(data);
        } catch (err) {
          console.error("Error fetching airports", err);
        }
      }, 300);
    }
  };

  const handleSearch =  async () => {
    const payload = {
      tripType: tripType === "round" ? "round-trip" : "one-way",
      fromSkyId: fromAirport?.id,
      fromEntityId: fromAirport?.entityId,
      fromTitle: fromAirport?.title,
      fromSubtitle: fromAirport?.subtitle,
      toSkyId: toAirport?.id,
      toEntityId: toAirport?.entityId,
      toTitle: toAirport?.title,
      toSubtitle: toAirport?.subtitle,
      departureDate: dayjs(departureDate).format("YYYY-MM-DD"),
      returnDate: tripType === "round" ? dayjs(returnDate).format("YYYY-MM-DD") : "",
      adults: String(travelers.adults),
      children: String(travelers.children),
      infants: String(travelers.infants),
      cabinClass,
    };
    setSearchPayload(payload)
    console.log("Search Payload:", searchPayload);
    console.log("from air", fromAirport);

   await fetchFlights(payload);
    const response = await axios.get('http://localhost:9555/api/flights/getFlightDetails?origin=`${}`', searchPayload);
console.log(response.data,"data froom backedn")
    

    if (true) {
      navigate("/flights", { state: { data: dummyResponse, search: payload } });
    } else {
      const query = new URLSearchParams(payload).toString();
      fetch(`/api/flights/search?${query}`)
        .then((res) => res.json())
        .then((data) => navigate("/flights", { state: { data, search: payload } }))
        .catch((err) => console.error("Search failed", err));
    }
  };

//   const darkTextFieldStyles = {
//     "& .MuiInputBase-root": {
//       color: "black",
//     },
//     "& .MuiInputLabel-root": {
//       color: "black",
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "black",
//     },
//   };


// const inputStyles = {
//     sx: {
//       backgroundColor: "var(--color-background)",
//       color: "var(--color-foreground)",
//       input: { color: "var(--color-foreground)" },
//       label: { color: "var(--color-foreground)" },
//       svg: { color: "var(--color-foreground)" },
//     },
//   };

  const inputStyles = {
    sx: {
      backgroundColor: "var(--color-background)",
      color: "var(--color-foreground)",
      input: { color: "var(--color-foreground)" },
      label: { color: "var(--color-foreground)" },
      svg: { color: "var(--color-foreground)" },
      option: { color: "var(--color-foreground)" }
    },
  };
  
  const darkTextFieldStyles = {
    "& .MuiInputBase-root": {
      color: "black",
    },
    "& .MuiInputLabel-root": {
      color: "black",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-4 md:p-6 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-5 gap-4 items-center max-w-6xl mx-auto">
      
      {/* Trip Type */}
      <div className="col-span-1 md:col-span-5">
        <RadioGroup row value={tripType} onChange={(e) => setTripType(e.target.value)}>
          <FormControlLabel value="oneway" control={<Radio />} label="One-way" />
          <FormControlLabel value="round" control={<Radio />} label="Round-trip" />
        </RadioGroup>
      </div>

      {/* From */}
      <div>
        <label className="text-white dark:text-white font-medium flex items-center gap-1"><RiFlightTakeoffFill /> From</label>
        <Autocomplete
          options={airportOptions}
          getOptionLabel={(option) => `${option.name}, ${option.country}`}
          filterOptions={(x) => x}
          onInputChange={(e, val) => fetchAirports(val, setAirportOptions)}
          value={fromAirport}
          onChange={(e, value) => setFromAirport(value)}
          renderInput={(params) => (
            <TextField {...params} placeholder="Enter departure city" size="small"                 
             {...inputStyles}
            // sx={darkTextFieldStyles}
             />
          )}
        />
      </div>

      {/* To */}
      <div>
        <label className="text-white dark:text-white font-medium flex items-center gap-1"><RiFlightLandFill /> To</label>
        <Autocomplete
          options={airportOptions}
          getOptionLabel={(option) => `${option.name}, ${option.country}`}
          filterOptions={(x) => x}
          onInputChange={(e, val) => fetchAirports(val, setAirportOptions)}
          value={toAirport}
          onChange={(e, value) => setToAirport(value)}
          renderInput={(params) => (
            <TextField {...params} placeholder="Enter destination city" size="small"
            {...inputStyles}
            // sx={darkTextFieldStyles}
             />
          )}
        />
      </div>

      {/* Departure */}
      <div>
        <label className="text-white dark:text-white font-medium flex items-center gap-1"><MdOutlineDateRange /> Departure</label>
        <DatePicker
  value={departureDate}
  onChange={(newValue) => setDepartureDate(newValue)}
  disablePast
  minDate={departureDate || dayjs()}
  slotProps={{ textField: { size: "small", ...inputStyles } }}
/>
       
      </div>

      {/* Return */}
      {tripType === "round" && (
        <div>
          <label className="text-white dark:text-white font-medium flex items-center gap-1"><MdOutlineDateRange /> Return</label>
         
<DatePicker
  value={returnDate}
  onChange={(newValue) => setReturnDate(newValue)}
  disablePast
  minDate={departureDate || dayjs()}
  slotProps={{ textField: { size: "small", ...inputStyles } }}
/>

         
        </div>
      )}


<div className="flex flex-col md:flex-row gap-3">
  {/* Travelers */}
  <div className="flex flex-col gap-1">
    <label className="text-white dark:text-white font-medium flex items-center gap-2">
      <HiOutlineUserGroup /> Travelers
    </label>
    <div className="flex gap-2">
    

<Button
  variant="outlined"
  onClick={handleTravelerClick}
  sx={{
    color: "var(--color-foreground)",
    borderColor: "var(--color-foreground)",
    textTransform: "none",
    '&:hover': {
      borderColor: "var(--color-foreground)",
      backgroundColor: "rgba(255,255,255,0.05)",
    },
  }}
>
  {travelers.adults} Adults, {travelers.children} Children, {travelers.infants} Infants
</Button>

  
    </div>
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleTravelerClose}>
      {["adults", "children", "infants"].map((type) => (
        <MenuItem key={type}>
          <span className="capitalize mr-2">{type}</span>
          <input
            type="number"
            min="0"
            max="9"
            value={travelers[type]}
            onChange={(e) =>
              setTravelers((prev) => ({
                ...prev,
                [type]: Math.max(0, parseInt(e.target.value) || 0),
              }))
            }
            style={{ width: 40 }}
          />
        </MenuItem>
      ))}
    </Menu>
  </div>


</div>

 

<div className="flex flex-col gap-1">
  <label className="text-white dark:text-white font-medium flex items-center gap-2">
    <FaChair /> Class
  </label>
  <FormControl fullWidth size="small">
    <Select
      value={cabinClass}
      onChange={(e) => setCabinClass(e.target.value)}
      displayEmpty
      sx={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-foreground)",
        svg: { color: "var(--color-foreground)" },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: "#fff",
            color: "#000",
          },
        },
      }}
    >
      <MenuItem disabled value="">
        Select Class
      </MenuItem>
      <MenuItem value="economy">Economy</MenuItem>
    </Select>
  </FormControl>
</div>



      {/* Search Button */}
      <div className="md:col-span-5 flex justify-end pt-2">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSearch}
          startIcon={<MdTravelExplore />}
          sx={{ borderRadius: "9999px", paddingX: 4 }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default HomeSearchBox;

