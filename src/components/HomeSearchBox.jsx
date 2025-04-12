

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

  const handleSearch =  () => {
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

//    await fetchFlights(payload);
//     const response = await axios.post('http://localhost:9555/api/flights/search-flights', searchPayload);
// console.log(response.data,"data froom backedn")
    

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
        {/* <DatePicker
          value={departureDate}
          onChange={(newValue) => setDepartureDate(newValue)}
          slotProps={{ textField: { size: "small", ...inputStyles } }}

        //   slotProps={{ textField: { size: "small", sx: darkTextFieldStyles } }}
        /> */}
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

          {/* <DatePicker
            value={returnDate}
            onChange={(newValue) => setReturnDate(newValue)}
            slotProps={{ textField: { size: "small", ...inputStyles } }}

            // slotProps={{ textField: { size: "small", sx: darkTextFieldStyles } }}
          /> */}
        </div>
      )}


<div className="flex flex-col md:flex-row gap-3">
  {/* Travelers */}
  <div className="flex flex-col gap-1">
    <label className="text-white dark:text-white font-medium flex items-center gap-2">
      <HiOutlineUserGroup /> Travelers
    </label>
    <div className="flex gap-2">
    {/* <Button
  variant="outlined"
  onClick={handleTravelerClick}
  sx ={{
    backgroundColor: "var(--color-background)",
    color: "var(--color-foreground)",
    input: { color: "var(--color-foreground)" },
    label: { color: "var(--color-foreground)" },
    svg: { color: "var(--color-foreground)" },
    option: { color: "var(--color-foreground)" }
  }}
  // sx={{
  //   color: "var(--color-foreground)",
  //   borderColor: "var(--color-foreground)",
  //   '&:hover': {
  //     borderColor: "var(--color-foreground)",
  //     backgroundColor: "rgba(255,255,255,0.05)",
  //   },
  // }}
>
  {travelers.adults} Adults, {travelers.children} Children, {travelers.infants} Infants
</Button> */}

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

      {/* <Button variant="contained" onClick={handleTravelerClick}>
        {travelers.adults} Adults, {travelers.children} Children, {travelers.infants} Infants
      </Button> */}
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
      <MenuItem value="business">Business</MenuItem>
      <MenuItem value="first">First</MenuItem>
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


// import React, { useState, useEffect, useMemo } from "react";
// import {
//   TextField,
//   Autocomplete,
//   Button,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Menu,
//   MenuItem,
//   Box,
//   Typography,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { RiFlightTakeoffFill, RiFlightLandFill } from "react-icons/ri";
// import { MdOutlineDateRange, MdTravelExplore } from "react-icons/md";
// import { HiOutlineUserGroup } from "react-icons/hi2";
// import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";

// const HomeSearchBox = () => {
//   const [tripType, setTripType] = useState("one-way");
//   const [fromAirport, setFromAirport] = useState(null);
//   const [toAirport, setToAirport] = useState(null);
//   const [departureDate, setDepartureDate] = useState(null);
//   const [returnDate, setReturnDate] = useState(null);
//   const [cabinClass, setCabinClass] = useState("economy");
//   const [airportOptions, setAirportOptions] = useState([]);
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);
//   const [infants, setInfants] = useState(0);
//   const [travelerAnchorEl, setTravelerAnchorEl] = useState(null);
//   const navigate = useNavigate();

//   const fetchAirports = useMemo(() => {
//     let debounce;
//     return (query, callback) => {
//       clearTimeout(debounce);
//       debounce = setTimeout(async () => {
//         if (!query) return;
//         try {
//           const res = await fetch(
//             `http://localhost:8080/airlineticketbooking/api/airports?query=${encodeURIComponent(query)}`
//           );
//           const data = await res.json();
//           console.log("Airport search results:", data);
//           callback(data);
//         } catch (err) {
//           console.error("Failed to fetch airports", err);
//           callback([]);
//         }
//       }, 400);
//     };
//   }, []);

//   const handleSearch = async () => {
//     const payload = {
//       tripType,
//       fromSkyId: fromAirport?.id,
//       fromEntityId: fromAirport?.entityId,
//       fromTitle: fromAirport?.name,
//       fromSubtitle: fromAirport?.country,
//       toSkyId: toAirport?.id,
//       toEntityId: toAirport?.entityId,
//       toTitle: toAirport?.name,
//       toSubtitle: toAirport?.country,
//       departureDate: dayjs(departureDate).format("YYYY-MM-DD"),
//       returnDate: tripType === "round" ? dayjs(returnDate).format("YYYY-MM-DD") : "",
//       adults: String(adults),
//       children: String(children),
//       infants: String(infants),
//       cabinClass,
//     };
//     console.log("Search Payload:", payload);

//     navigate("/flights", { state: { data: { dummy: true }, search: payload } });
//   };

//   const handleTravelerClick = (event) => {
//     setTravelerAnchorEl(event.currentTarget);
//   };

//   const handleTravelerClose = () => {
//     setTravelerAnchorEl(null);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-700 dark:text-white p-4 md:p-6 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-5 gap-4 items-center max-w-6xl mx-auto">
//       {/* Trip Type */}
//       <div className="col-span-5">
//         <RadioGroup
//           row
//           value={tripType}
//           onChange={(e) => setTripType(e.target.value)}
//         >
//           <FormControlLabel value="one-way" control={<Radio />} label="One-way" />
//           <FormControlLabel value="round" control={<Radio />} label="Round-trip" />
//         </RadioGroup>
//       </div>

//       {/* From Airport */}
//       <div className="flex flex-col gap-1">
//         <label className="font-medium text-black dark:text-white flex items-center gap-2">
//           <RiFlightTakeoffFill /> From
//         </label>
//         <Autocomplete
//           options={airportOptions}
//           getOptionLabel={(option) => `${option.name}, ${option.country}`}
//           filterOptions={(x) => x}
//           onInputChange={(e, val) => fetchAirports(val, setAirportOptions)}
//           value={fromAirport}
//           onChange={(e, value) => setFromAirport(value)}
//           renderInput={(params) => (
//             <TextField {...params} placeholder="Enter departure city" size="small" />
//           )}
//         />
//       </div>

//       {/* To Airport */}
//       <div className="flex flex-col gap-1">
//         <label className="font-medium text-black dark:text-white flex items-center gap-2">
//           <RiFlightLandFill /> To
//         </label>
//         <Autocomplete
//           options={airportOptions}
//           getOptionLabel={(option) => `${option.name}, ${option.country}`}
//           filterOptions={(x) => x}
//           onInputChange={(e, val) => fetchAirports(val, setAirportOptions)}
//           value={toAirport}
//           onChange={(e, value) => setToAirport(value)}
//           renderInput={(params) => (
//             <TextField {...params} placeholder="Enter destination city" size="small" />
//           )}
//         />
//       </div>

//       {/* Departure Date */}
//       <div className="flex flex-col gap-1">
//         <label className="font-medium text-black dark:text-white flex items-center gap-2">
//           <MdOutlineDateRange /> Departure
//         </label>
//         <DatePicker
//           value={departureDate}
//           onChange={(newValue) => setDepartureDate(newValue)}
//           slotProps={{ textField: { size: "small" } }}
//         />
//       </div>

//       {/* Return Date */}
//       {tripType === "round" && (
//         <div className="flex flex-col gap-1">
//           <label className="font-medium text-black dark:text-white flex items-center gap-2">
//             <MdOutlineDateRange /> Return
//           </label>
//           <DatePicker
//             value={returnDate}
//             onChange={(newValue) => setReturnDate(newValue)}
//             slotProps={{ textField: { size: "small" } }}
//           />
//         </div>
//       )}

//       {/* Travelers + Class */}
//       <div className="flex flex-col gap-1">
//         <label className="font-medium text-black dark:text-white flex items-center gap-2">
//           <HiOutlineUserGroup /> Travelers
//         </label>
//         <Box className="flex items-center gap-2">
//           <Button onClick={handleTravelerClick} variant="outlined">
//             {/* {adults} Adults, {children} Children, {infants} Infants */}
//             {adults} A, {children} C, {infants} I
//           </Button>
//           <Menu
//             anchorEl={travelerAnchorEl}
//             open={Boolean(travelerAnchorEl)}
//             onClose={handleTravelerClose}
//           >
//             {[
//               ["Adults", adults, setAdults],
//               ["Children", children, setChildren],
//               ["Infants", infants, setInfants],
//             ].map(([label, count, setCount]) => (
//               <MenuItem key={label} className="flex justify-between items-center gap-4">
//                 <Typography>{label}</Typography>
//                 <div className="flex gap-2 items-center">
//                   <Button onClick={() => setCount(Math.max(0, count - 1))}>-</Button>
//                   <Typography>{count}</Typography>
//                   <Button onClick={() => setCount(count + 1)}>+</Button>
//                 </div>
//               </MenuItem>
//             ))}
//           </Menu>
//           <TextField
//             select
//             size="small"
//             value={cabinClass}
//             onChange={(e) => setCabinClass(e.target.value)}
//             SelectProps={{ native: true }}
//           >
//             <option value="economy">Economy</option>
//             <option value="business">Business</option>
//             <option value="first">First</option>
//           </TextField>
//         </Box>
//       </div>

//       {/* Search Button */}
//       <div className="md:col-span-5 flex justify-end pt-2">
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           onClick={handleSearch}
//           startIcon={<MdTravelExplore />}
//           sx={{ borderRadius: "9999px", paddingX: 4 }}
//         >
//           Search
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default HomeSearchBox;

// import React, { useState, useEffect } from "react";
// import { TextField, Autocomplete, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
// import { FaSearch } from "react-icons/fa";
// import { MdOutlineDateRange } from "react-icons/md";
// import { RiFlightTakeoffFill, RiFlightLandFill } from "react-icons/ri";
// import { MdTravelExplore } from "react-icons/md";
// import { HiOutlineUserGroup } from "react-icons/hi2";
// import { useNavigate } from "react-router-dom";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";

// const TEST_MODE = true; // Switch to false to enable backend call

// const dummyAirports = [
//   { id: "DEL", name: "Delhi", city: "Delhi", country: "India" },
//   { id: "BOM", name: "Mumbai", city: "Mumbai", country: "India" },
//   { id: "BLR", name: "Bangalore", city: "Bangalore", country: "India" },
// ];

// const dummyResponse = {
//   flights: [/* some dummy flights */],
//   filters: { /* dummy filters */ }
// };

// const HomeSearchBox = () => {
//   const [tripType, setTripType] = useState("oneway");
//   const [fromAirport, setFromAirport] = useState(null);
//   const [toAirport, setToAirport] = useState(null);
//   const [departureDate, setDepartureDate] = useState(null);
//   const [returnDate, setReturnDate] = useState(null);
//   const [travelers, setTravelers] = useState(1);
//   const [cabinClass, setCabinClass] = useState("economy");
//   const [airportOptions, setAirportOptions] = useState(dummyAirports);
//   const navigate = useNavigate();

//   const handleSearch = async () => {
//     const payload = {
//       fromId: fromAirport?.id,
//       toId: toAirport?.id,
//       depart: dayjs(departureDate).format("YYYY-MM-DD"),
//       ...(tripType === "round" && returnDate ? { return: dayjs(returnDate).format("YYYY-MM-DD") } : {}),
//       travelers,
//       cabinClass,
//     };

//     console.log("Search payload:", payload);

//     if (TEST_MODE) {
//       navigate("/flights", { state: { data: dummyResponse, search: payload } });
//     } else {
//       try {
//         const query = new URLSearchParams(payload).toString();
//         const res = await fetch(`/api/flights/search?${query}`);
//         const data = await res.json();
//         navigate("/flights", { state: { data, search: payload } });
//       } catch (err) {
//         console.error("Search failed", err);
//       }
//     }
//   };

//   const handleAutocompleteFilter = (input, option) => {
//     const search = input.toLowerCase();
//     return (
//       option.name.toLowerCase().includes(search) ||
//       option.city.toLowerCase().includes(search) ||
//       option.id.toLowerCase().includes(search)
//     );
//   };

//   return (
//     <div className="bg-white dark:bg-neutral-900 p-4 md:p-6 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-5 gap-4 items-center max-w-6xl mx-auto">
      
//       {/* Trip Type */}
//       <div className="col-span-1 md:col-span-5">
//         <RadioGroup row value={tripType} onChange={(e) => setTripType(e.target.value)}>
//           <FormControlLabel value="oneway" control={<Radio />} label="One-way" />
//           <FormControlLabel value="round" control={<Radio />} label="Round-trip" />
//         </RadioGroup>
//       </div>

//       {/* From Airport */}
//       <div className="flex flex-col gap-1">
//         <label className="font-medium flex items-center gap-2"><RiFlightTakeoffFill /> From</label>
//         <Autocomplete
//           options={airportOptions}
//           getOptionLabel={(option) => `${option.city} (${option.id})`}
//           filterOptions={(options, state) => options.filter(option => handleAutocompleteFilter(state.inputValue, option))}
//           value={fromAirport}
//           onChange={(e, value) => setFromAirport(value)}
//           renderInput={(params) => <TextField {...params} placeholder="Enter departure city" />}
//         />
//       </div>

//       {/* To Airport */}
//       <div className="flex flex-col gap-1">
//         <label className="font-medium flex items-center gap-2"><RiFlightLandFill /> To</label>
//         <Autocomplete
//           options={airportOptions}
//           getOptionLabel={(option) => `${option.city} (${option.id})`}
//           filterOptions={(options, state) => options.filter(option => handleAutocompleteFilter(state.inputValue, option))}
//           value={toAirport}
//           onChange={(e, value) => setToAirport(value)}
//           renderInput={(params) => <TextField {...params} placeholder="Enter destination city" />}
//         />
//       </div>

//       {/* Departure Date */}
//       <div className="flex flex-col gap-1">
//         <label className="font-medium flex items-center gap-2"><MdOutlineDateRange /> Departure</label>
//         <DatePicker
//           value={departureDate}
//           onChange={(date) => setDepartureDate(date)}
//           slotProps={{ textField: { placeholder: "Select date", size: "small" } }}
//         />
//       </div>

//       {/* Return Date (only for round-trip) */}
//       {tripType === "round" && (
//         <div className="flex flex-col gap-1">
//           <label className="font-medium flex items-center gap-2"><MdOutlineDateRange /> Return</label>
//           <DatePicker
//             value={returnDate}
//             onChange={(date) => setReturnDate(date)}
//             slotProps={{ textField: { placeholder: "Select return", size: "small" } }}
//           />
//         </div>
//       )}

//       {/* Travelers + Class */}
//       <div className="flex flex-col gap-1">
//         <label className="font-medium flex items-center gap-2"><HiOutlineUserGroup /> Travelers</label>
//         <div className="flex items-center gap-2">
//           <TextField
//             type="number"
//             size="small"
//             value={travelers}
//             onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
//             inputProps={{ min: 1 }}
//             sx={{ width: "5rem" }}
//           />
//           <TextField
//             select
//             size="small"
//             value={cabinClass}
//             onChange={(e) => setCabinClass(e.target.value)}
//             SelectProps={{ native: true }}
//           >
//             <option value="economy">Economy</option>
//             <option value="business">Business</option>
//             <option value="first">First</option>
//           </TextField>
//         </div>
//       </div>

//       {/* Search Button */}
//       <div className="md:col-span-5 flex justify-end pt-2">
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           onClick={handleSearch}
//           startIcon={<MdTravelExplore />}
//           sx={{ borderRadius: "9999px", paddingX: 4 }}
//         >
//           Search
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default HomeSearchBox;
