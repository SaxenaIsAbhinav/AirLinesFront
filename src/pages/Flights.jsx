import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import FlightsList from '../components/FlightsList';
import FlightModal from '../components/FlightModal';
import FlightFilters from '../components/FlightFilters';
// import { dummyResponse } from '../utils/dummyResponse';

// const TEST_MODE = true;

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
  const [filters, setFilters] = useState({ price: { min: 0, max: 100000 } });

  useEffect(() => {
    fetch("http://localhost:9555/api/flights/getflightDetails")
      .then((response) => response.json())
      .then((data) => {
        const enrichedData = data.map((flight) => ({
          ...flight,
          stops: 0,
          airlineLogo: "https://logos.skyscnr.com/images/airlines/favicon/AI.png",

        }));
 

setInitialFlights(enrichedData);
setFilteredData(enrichedData);
setFlights(enrichedData);
setFilters({
  carrier: Array.from(new Set(enrichedData.map(f => f.airline))),
  stops: [0],
  price: {
    min: Math.min(...enrichedData.map(f => f.price)),
    max: Math.max(...enrichedData.map(f => f.price)),
  },
});
      

setFilterParams({
  carriers: [],
  stops: [],
  price: {
    min: Math.min(...enrichedData.map(f => f.price)),
    max: Math.max(...enrichedData.map(f => f.price)),
  },
});
})
.catch ((error) => console.error("Failed to fetch flights:", error));
}, []);

    

const handleFlightSelect = () => {
  setModalOpen(true);
};

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
  const priceMin = updatedParams.price.min;
  const priceMax = updatedParams.price.max;


  filtered = filtered.filter(flight => 
    flight.price >= priceMin && flight.price <= priceMax
  );


  setFilteredData(filtered);
  setFlights(filtered);

};

const resetFilters = () => {
  const priceRange = filters.price || { min: 0, max: 100000 };
  const resetParams = { carriers: [], stops: [], price: priceRange };
  setFilterParams(resetParams);
  setFilteredData(initialFlights);
  setFlights(initialFlights);
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
      <FlightModal />
    </div>
   </div>

  );
};
export default Flights;