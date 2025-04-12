// context/AppContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showFlightModal, setShowFlightModal] = useState(false);
  const [searchPayload, setSearchPayload] = useState(null);
  const [passengerList, setPassengerList] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [alreadyBookedSeats, setAlreadyBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [priceSummary, setPriceSummary] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);

  const fetchFlights = async (payload) => {
        try {
    //       const response = await axios.post('http://localhost:9555/api/flights/search-flights', payload);
    //       setFlights(response.data.flights);
    //       setFilters(response.data.filters);
    // console.log(response.data.flights)
    // console.log(response.data.filters)
        } catch (error) {
          console.error('Error fetching flights:', error);
        }
      };
    
  return (
    <AppContext.Provider
      value={{
        flights,fetchFlights,
        setFlights,
        filters,
        setFilters,    
          selectedFlight,
        setSelectedFlight,
        showFlightModal,
        setShowFlightModal,searchPayload, setSearchPayload,
        passengerList,
        setPassengerList,selectedSeat, setSelectedSeat,
        alreadyBookedSeats, setAlreadyBookedSeats,
        selectedSeats, setSelectedSeats,
        priceSummary, setPriceSummary,paymentStatus, setPaymentStatus,ticketDetails, setTicketDetails
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);


///////////////////

// import React, { createContext, useContext, useState } from 'react';

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [selectedFlight, setSelectedFlight] = useState(null);

//   return (
//     <AppContext.Provider value={{ selectedFlight, setSelectedFlight }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);


///////////////////
// import React, { createContext, useContext, useState } from 'react';

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [selectedFlight, setSelectedFlight] = useState(null);

//   return (
//     <AppContext.Provider value={{ selectedFlight, setSelectedFlight }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useAppContext must be used inside AppProvider');
//   }
//   return context;
// };
