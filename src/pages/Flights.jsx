import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import FlightsList from '../components/FlightsList';
import FlightModal from '../components/FlightModal';
import FlightFilters from '../components/FlightFilters';
import { dummyResponse } from '../utils/dummyResponse';

const TEST_MODE = true;

const Flights = () => {
  const { selectedFlight } = useAppContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [initialFlights, setInitialFlights] = useState([]);
  const [filterParams, setFilterParams] = useState({
    carriers: [],
    stops: [],
    price: { min: 0, max: 100000 },
  });
  const [filteredData, setFilteredData] = useState([]);
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (TEST_MODE) {
      const initial = dummyResponse.flights;
      setInitialFlights(initial);
      setFilteredData(initial);
      setFlights(initial);
      setFilters(dummyResponse.filters);
      setFilterParams({
        carriers: [],
        stops: [],
        price: dummyResponse.filters.price,
      });
    }

  }, []);

  const handleFlightSelect = () => {
    setModalOpen(true);
  };

//   const applyFilters = ({ carriers, stops, price, isReset }) => {
//     const updatedParams = {
//       carriers: carriers ?? filterParams.carriers,
//       stops: stops ?? filterParams.stops,
//       price: price ?? filterParams.price,
//     };

//     console.log("Filter Params:", updatedParams);

//     const filtered = initialFlights.filter((flight) => {
//       const airlineMatch =
//         updatedParams.carriers.length === 0 || updatedParams.carriers.includes(flight.airline);
//       const stopMatch =
//         updatedParams.stops.length === 0 || updatedParams.stops.includes(flight.stops);
//       const priceMatch =
//         flight.priceValue >= updatedParams.price.min &&
//         flight.priceValue <= updatedParams.price.max;

//       console.log("airlineMatch", airlineMatch);
//       console.log("stopMatch", stopMatch);
//       console.log("priceMatch", priceMatch);

//       return airlineMatch && stopMatch && priceMatch;
//     });
// console.log("filtered",filtered);

//     setFilterParams(updatedParams);
//     setFilteredData(filtered);
//     setFlights(filtered);
//     console.log("Filtered Flights:", filtered);
//   };
const applyFilters = ({ carriers, stops, price, isReset }) => {
  const updatedParams = {
    carriers: carriers ?? filterParams.carriers,
    stops: stops ?? filterParams.stops,
    price: price ?? filterParams.price,
  };

  setFilterParams(updatedParams);

  // Start with all flights
  let filtered = [...initialFlights];

  // 1. Filter by carriers
  if (updatedParams.carriers.length > 0) {
    filtered = filtered.filter(flight =>
      updatedParams.carriers.includes(flight.airline)
    );
    console.log("Filtered by carriers:", filtered);
  } else {
    console.log("No carrier filter applied.");
  }

  // 2. Filter by stops
  if (updatedParams.stops.length > 0) {
    filtered = filtered.filter(flight =>
      updatedParams.stops.includes(flight.stops)
    );
    console.log("Filtered by stops:", filtered);
  } else {
    console.log("No stops filter applied.");
  }

  // 3. Filter by price
  const priceMin = typeof updatedParams.price?.min === 'number' ? updatedParams.price.min : 0;
  const priceMax = typeof updatedParams.price?.max === 'number' ? updatedParams.price.max : Infinity;

  if (!isNaN(priceMin) && !isNaN(priceMax)) {
    filtered = filtered.filter(flight => {
      const priceValue = parsePrice(flight.price); // use raw string price
      const match = priceValue >= priceMin && priceValue <= priceMax;
    
      console.log(`Checking price for ${flight.airline}:`, {
        priceValue,
        priceMin,
        priceMax,
        match,
        flight
      });
    
      return match;
    });
    
    
    // filtered = filtered.filter(flight => {
    //   const priceValue = flight.priceValue ?? 0;
    //   return priceValue >= priceMin && priceValue <= priceMax;
    // });
    console.log("Filtered by price:", filtered);
  } else {
    console.log("Price range is invalid, skipping price filter.");
  }

  setFilteredData(filtered);
  setFlights(filtered);

  console.log("Final Filter Params:", updatedParams);
  console.log("Final Filtered Flights:", filtered);
};
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return Number(priceStr.replace(/[^\d]/g, '')) || 0;
};


  const resetFilters = () => {
    const priceRange = filters.price || { min: 0, max: 100000 };
    const resetParams = { carriers: [], stops: [], price: priceRange };
    setFilterParams(resetParams);
    setFilteredData(initialFlights);
    setFlights(initialFlights);
    console.log("Filters Reset");
  };

  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      
      <div className="col-span-1">
        <FlightFilters filters={filters} onFilterChange={applyFilters} onReset={resetFilters} />
      </div>
      <div className="col-span-1 md:col-span-3">
        <h2 className="text-xl font-bold mb-4">Available Flights</h2>
        <FlightsList flights={flights} onFlightSelect={handleFlightSelect} />
        <FlightModal open={modalOpen} onClose={() => setModalOpen(false)} flight={selectedFlight} />
      </div>
      <FlightModal />

    </div>
  );
};

export default Flights;


// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import FlightsList from '../components/FlightsList';
// import FlightModal from '../components/FlightModal';
// import FlightFilters from '../components/FlightFilters';
// import { dummyResponse } from '../utils/dummyResponse';

// const TEST_MODE = true;

// const Flights = () => {
//   const { selectedFlight } = useAppContext();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [initialFlights, setInitialFlights] = useState([]);
//   const [filterParams, setFilterParams] = useState({ carriers: [], stops: [], price: { min: 0, max: 100000 } });
//   const [filteredData, setFilteredData] = useState([]);
//   const [flights, setFlights] = useState([]);
//   const [filters, setFilters] = useState({});

//   useEffect(() => {
//     if (TEST_MODE) {
//       const initial = dummyResponse.flights;
//       // const priceValues = initial.map(f => f.priceValue);
//       // const minPrice = Math.min(...priceValues);
//       // const maxPrice = Math.max(...priceValues);

//       setInitialFlights(initial);
//       setFilteredData(initial);
//       setFlights(initial);
      
//       // setFilters({
//       //   carriers: dummyResponse.filters.carriers,
//       //   price: { min: minPrice, max: maxPrice },
//       // });
//       setFilters(dummyResponse.filters);
//       setFilterParams({ carriers: [], stops: [], price: dummyResponse.filters.price });
//     }
//   }, []);
  
//   const handleFlightSelect = () => {
//     setModalOpen(true);
//   };

//   const applyFilters = ({ carriers, stops, price, isReset }) => {
//     const updatedParams = {
//       carriers: carriers ?? filterParams.carriers,
//       stops: stops ?? filterParams.stops,
//       price: price ?? filterParams.price,
//     };
//     console.log(updatedParams);
    
//     setFilterParams(updatedParams);

//     const filtered = initialFlights.filter(flight => {
//       const airlineMatch =
//         updatedParams.carriers.length === 0 || updatedParams.carriers.includes(flight.airline);
//       const stopMatch =
//         updatedParams.stops.length === 0 || updatedParams.stops.includes(flight.stops);
//       const priceMatch =
//         flight.priceValue >= updatedParams.price.min && flight.priceValue <= updatedParams.price.max;
// console.log("aliline mtch ",airlineMatch);
// console.log("stopMatch mtch ",stopMatch);
// console.log("priceMatch mtch ",priceMatch);

//       return airlineMatch && stopMatch && priceMatch;
//     });

//     setFilteredData(filtered);
//     setFlights(filtered);

//     console.log("Filter Params:", updatedParams);
//     console.log("Initial Flights:", initialFlights);
//     console.log("Filtered Flights:", filtered);
//     console.log("Final Flights (shown):", filtered);
//   };

//   const resetFilters = () => {
//     const priceRange = filters.price || { min: 0, max: 100000 };
//     const resetParams = { airlines: [], stops: [], price: priceRange };
//     setFilterParams(resetParams);
//     setFilteredData(initialFlights);
//     setFlights(initialFlights);

//     console.log("Filters Reset");
//     console.log("Initial Flights:", initialFlights);
//     console.log("Filtered Flights:", initialFlights);
//     console.log("Final Flights (shown):", initialFlights);
//   };
//   console.log(flights);
//   console.log(filters,"filters");

//   return (
//     <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
//       <div className="col-span-1">
//         <FlightFilters
//           filters={filters}
//           onFilterChange={applyFilters}
//           onReset={resetFilters}
//         />
//       </div>

//       <div className="col-span-1 md:col-span-3">
//         <h2 className="text-xl font-bold mb-4">Available Flights</h2>
//         <FlightsList flights={flights} onFlightSelect={handleFlightSelect} />
//         <FlightModal open={modalOpen} onClose={() => setModalOpen(false)} flight={selectedFlight} />
//       </div>
//     </div>
//   );
// };

// export default Flights;


// ----------------


// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import FlightsList from '../components/FlightsList';
// import FlightModal from '../components/FlightModal';
// import FlightFilters from '../components/FlightFilters';
// import { dummyResponse } from '../utils/dummyResponse';

// const TEST_MODE = true;

// const Flights = () => {
//   const { selectedFlight } = useAppContext();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [initialFlights, setInitialFlights] = useState([]); // full original response
//   const [filterParams, setFilterParams] = useState({ airlines: [], stops: [], price: [0, 100000] });
//   const [filteredData, setFilteredData] = useState([]); // filtered based on filters
//   const [flights, setFlights] = useState([]); // final flights to show (filtered or full)
//   const [filters, setFilters] = useState({});

//   useEffect(() => {
//     if (TEST_MODE) {
//       const initial = dummyResponse.flights;
//       const priceValues = initial.map(f => f.priceValue);
//       const minPrice = Math.min(...priceValues);
//       const maxPrice = Math.max(...priceValues);

//       setInitialFlights(initial);
//       setFilteredData(initial);
//       setFlights(initial);
//       setFilters(dummyResponse.filters);
//       setFilterParams({ airlines: [], stops: [], price: [minPrice, maxPrice] });
//     }
//   }, []);

//   const handleFlightSelect = () => {
//     setModalOpen(true);
//   };

//   const applyFilters = (newFilters) => {
//     const updatedParams = {
//       ...filterParams,
//       ...newFilters,
//     };
//     setFilterParams(updatedParams);

//     const filtered = initialFlights.filter(flight => {
//       const airlineMatch =
//         updatedParams.airlines.length === 0 || updatedParams.airlines.includes(flight.airline);
//       const stopMatch =
//         updatedParams.stops.length === 0 || updatedParams.stops.includes(flight.stops);
//       const priceMatch =
//         flight.priceValue >= updatedParams.price[0] && flight.priceValue <= updatedParams.price[1];

//       return airlineMatch && stopMatch && priceMatch;
//     });

//     setFilteredData(filtered);
//     setFlights(filtered);

//     console.log("Filter Params:", updatedParams);
//     console.log("Initial Flights:", initialFlights);
//     console.log("Filtered Flights:", filtered);
//     console.log("Final Flights (shown):", flights);
//   };

//   const resetFilters = () => {
//     const priceRange = filters.priceRange || [0, 100000];
//     setFilterParams({ airlines: [], stops: [], price: priceRange });
//     setFilteredData(initialFlights);
//     setFlights(initialFlights);

//     console.log("Filters Reset");
//     console.log("Initial Flights:", initialFlights);
//     console.log("Filtered Flights:", initialFlights);
//     console.log("Final Flights (shown):", initialFlights);
//   };

//   return (
//     <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
//       <div className="col-span-1">
//         <FlightFilters
//           filters={filters}
//           onFilterChange={applyFilters}
//           onReset={resetFilters}
//         />
//       </div>

//       <div className="col-span-1 md:col-span-3">
//         <h2 className="text-xl font-bold mb-4">Available Flights</h2>
//         <FlightsList flights={flights} onFlightSelect={handleFlightSelect} />
//         <FlightModal open={modalOpen} onClose={() => setModalOpen(false)} flight={selectedFlight} />
//       </div>
//     </div>
//   );
// };

// export default Flights;
// ---------------------------------

// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import FlightsList from '../components/FlightsList';
// import FlightModal from '../components/FlightModal';
// import FlightFilters from '../components/FlightFilters';
// import { dummyResponse } from '../utils/dummyResponse';

// const TEST_MODE = true;

// const Flights = () => {
//   const { selectedFlight } = useAppContext();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [initialFlights, setInitialFlights] = useState([]); // original flights
//   const [flights, setFlights] = useState([]); // filtered or not
//   const [filters, setFilters] = useState({});

//   useEffect(() => {
//     if (TEST_MODE) {
//       setInitialFlights(dummyResponse.flights);
//       setFlights(dummyResponse.flights);
//       setFilters(dummyResponse.filters);
//     }

//   }, []);

//   const handleFlightSelect = () => {
//     setModalOpen(true);
//   };

//   const applyFilters = ({ airlines, stops, price, isReset = false }) => {
//     if (isReset) {
//       setFlights(initialFlights);
//       return;
//     }

//     const filtered = initialFlights.filter(flight => {
//       const airlineMatch = airlines.length === 0 || airlines.includes(flight.airline);
//       const stopMatch = stops.length === 0 || stops.includes(flight.stops);
//       const priceMatch = flight.priceValue >= price[0] && flight.priceValue <= price[1];
//       return airlineMatch && stopMatch && priceMatch;
//     });

//     setFlights(filtered);
//   };

//   return (
//     <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
//       <div className="col-span-1">
//         <FlightFilters
//           filters={filters}
//           onFilterChange={applyFilters}
//         />
//       </div>

//       <div className="col-span-1 md:col-span-3">
//         <h2 className="text-xl font-bold mb-4">Available Flights</h2>
//         <FlightsList flights={flights} onFlightSelect={handleFlightSelect} />
//         <FlightModal open={modalOpen} onClose={() => setModalOpen(false)} flight={selectedFlight} />
//       </div>
//     </div>
//   );
// };

// export default Flights;


// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import FlightsList from '../components/FlightsList';
// import FlightModal from '../components/FlightModal';
// import FlightFilters from '../components/FlightFilters';
// import { dummyResponse } from '../utils/dummyResponse';

// const TEST_MODE = true;

// const Flights = () => {
//   const { selectedFlight } = useAppContext();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [flights, setFlights] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [filteredFlights, setFilteredFlights] = useState([]);

//   useEffect(() => {
//     if (TEST_MODE) {
//       setFlights(dummyResponse.flights);
//       setFilters(dummyResponse.filters);
//       setFilteredFlights(dummyResponse.flights);
//     }
//     console.log(flights);
    
//   }, [flights]);

//   const handleFlightSelect = () => {
//     setModalOpen(true);
//   };

//   const applyFilters = ({ airlines, stops, price }) => {
//     const filtered = flights.filter(flight => {
//       const airlineMatch = airlines.length === 0 || airlines.includes(flight.airline);
//       const stopMatch = stops.length === 0 || stops.includes(flight.stops);
//       const priceMatch = flight.priceValue >= price[0] && flight.priceValue <= price[1];
//       return airlineMatch && stopMatch && priceMatch;
//     });

//     setFilteredFlights(filtered);
//   };

//   return (
//     <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
//       <div className="col-span-1">
//         <FlightFilters filters={filters} onFilterChange={applyFilters} />
//       </div>

//       <div className="col-span-1 md:col-span-3">
//         <h2 className="text-xl font-bold mb-4">Available Flights</h2>
//         <FlightsList flights={filteredFlights} onFlightSelect={handleFlightSelect} />
//         <FlightModal open={modalOpen} onClose={() => setModalOpen(false)} flight={selectedFlight} />
//       </div>
//     </div>
//   );
// };

// export default Flights;


// -----------------------
// // pages/Flights.jsx
// import React, { useState, useEffect } from 'react';
// import { useAppContext } from '../context/AppContext';
// import FlightsList from '../components/FlightsList';
// import FlightModal from '../components/FlightModal';
// import { TEST_MODE } from '../config/testConfig';
// import { dummyResponse } from '../utils/dummyResponse';

// const Flights = () => {
//   const {
//     selectedFlight,
//     setFlights,
//     setFilters,
//   } = useAppContext();

//   const [modalOpen, setModalOpen] = useState(false);

//   const handleFlightSelect = () => {
//     setModalOpen(true);
//   };

//   useEffect(() => {
//     if (TEST_MODE) {
//       setFlights(dummyResponse.flights);
//       setFilters(dummyResponse.filters);
//     }
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h2 className="text-xl font-bold mb-4">Available Flights</h2>
//       <FlightsList onFlightSelect={handleFlightSelect} />
//       <FlightModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         flight={selectedFlight}
//       />
//     </div>
//   );
// };

// export default Flights;

// --------------------

// import React, { useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import FlightsList from '../components/FlightsList';
// import FlightModal from '../components/FlightModal';

// const Flights = () => {
//   const { selectedFlight } = useAppContext();
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleFlightSelect = () => {
//     setModalOpen(true);
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h2 className="text-xl font-bold mb-4">Available Flights</h2>
//       <FlightsList onFlightSelect={handleFlightSelect} />
//       <FlightModal open={modalOpen} onClose={() => setModalOpen(false)} flight={selectedFlight} />
//     </div>
//   );
// };

// export default Flights;
