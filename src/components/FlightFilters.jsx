import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, Slider, Button } from '@mui/material';

const FlightFilters = ({ filters, onFilterChange, onReset }) => {
  const [selectedCarriers, setSelectedCarriers] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  // Initialize price range and reset when filters change
  useEffect(() => {
    if (filters?.price) {
      setPriceRange({ min: filters.price.min, max: filters.price.max });
    }
  }, [filters]);

  const handleCarrierToggle = (carrier) => {
    setSelectedCarriers((prev) =>
      prev.includes(carrier) ? prev.filter((c) => c !== carrier) : [...prev, carrier]
    );
  };

  const handleStopToggle = (stop) => {
    setSelectedStops((prev) =>
      prev.includes(stop) ? prev.filter((s) => s !== stop) : [...prev, stop]
    );
  };

  const handlePriceChange = (_, newValue) => {
    setPriceRange({ min: newValue[0], max: newValue[1] });
  };

  const handleApply = () => {
    onFilterChange({
      carriers: selectedCarriers, // ✅ correct key
      stops: selectedStops,
      price: priceRange,
      isReset: false,
    });
  };

  const handleReset = () => {
    setSelectedCarriers([]);
    setSelectedStops([]);
    const defaultPrice = {
      min: filters?.price?.min || 0,
      max: filters?.price?.max || 100000,
    };
    setPriceRange(defaultPrice);
    onReset?.();
  };

  return (
    <div className="bg-white dark:bg-neutral-800 p-4 rounded-2xl shadow space-y-6">
      <div>
        <h4 className="font-bold mb-2">Airlines</h4>
        <div className="max-h-40 overflow-y-auto space-y-1">
          {filters?.carriers?.map((carrier, idx) => (
            <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={selectedCarriers.includes(carrier)}
                  onChange={() => handleCarrierToggle(carrier)}
                />
              }
              label={carrier}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-2">Stops</h4>
        {[0, 1, 2].map((stop) => (
          <FormControlLabel
            key={stop}
            control={
              <Checkbox
                checked={selectedStops.includes(stop)}
                onChange={() => handleStopToggle(stop)}
              />
            }
            label={`${stop} Stop${stop !== 1 ? 's' : ''}`}
          />
        ))}
      </div>

      <div>
        <h4 className="font-bold mb-2">Price</h4>
        <Slider
          value={[priceRange.min, priceRange.max]}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={filters?.price?.min || 0}
          max={filters?.price?.max || 100000}
        />
      </div>

      <div className="flex justify-between gap-4">
        <Button variant="outlined" fullWidth onClick={handleReset}>
          Remove All
        </Button>
        <Button variant="contained" fullWidth onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FlightFilters;



// import React, { useEffect, useState } from 'react';
// import { Checkbox, FormControlLabel, Slider, Button } from '@mui/material';

// const FlightFilters = ({ filters, onFilterChange, onReset }) => {
//   const [selectedAirlines, setSelectedAirlines] = useState([]);
//   const [selectedStops, setSelectedStops] = useState([]);
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

//   // Initialize price range from filters
//   useEffect(() => {
//     if (filters?.price) {
//       setPriceRange({
//         min: filters.price.min,
//         max: filters.price.max
//       });
//     }
//   }, [filters]);

//   const handleAirlineToggle = (airline) => {
//     setSelectedAirlines(prev =>
//       prev.includes(airline)
//         ? prev.filter(a => a !== airline)
//         : [...prev, airline]
//     );
//   };

//   const handleStopToggle = (stop) => {
//     setSelectedStops(prev =>
//       prev.includes(stop)
//         ? prev.filter(s => s !== stop)
//         : [...prev, stop]
//     );
//   };

//   const handlePriceChange = (_, newValue) => {
//     setPriceRange({ min: newValue[0], max: newValue[1] });
//   };

//   const handleApply = () => {
//     onFilterChange({
//       airlines: selectedAirlines,
//       stops: selectedStops,
//       price: priceRange,
//       isReset: false,
//     });
//   };

//   const handleReset = () => {
//     setSelectedAirlines([]);
//     setSelectedStops([]);
//     const defaultPrice = {
//       min: filters?.price?.min || 0,
//       max: filters?.price?.max || 100000
//     };
//     setPriceRange(defaultPrice);
//     onReset?.();
//   };

//   return (
//     <div className="bg-white dark:bg-neutral-800 p-4 rounded-2xl shadow space-y-6">
//       <div>
//         <h4 className="font-bold mb-2">Airlines</h4>
//         <div className="max-h-40 overflow-y-auto space-y-1">
//           {filters?.carriers?.map((carrier, idx) => (
//             <FormControlLabel
//               key={idx}
//               control={
//                 <Checkbox
//                   checked={selectedAirlines.includes(carrier)}
//                   onChange={() => handleAirlineToggle(carrier)}
//                 />
//               }
//               label={carrier}
//             />
//           ))}
//         </div>
//       </div>

//       <div>
//         <h4 className="font-bold mb-2">Stops</h4>
//         {[0, 1, 2].map(stop => (
//           <FormControlLabel
//             key={stop}
//             control={
//               <Checkbox
//                 checked={selectedStops.includes(stop)}
//                 onChange={() => handleStopToggle(stop)}
//               />
//             }
//             label={`${stop} Stop${stop !== 1 ? 's' : ''}`}
//           />
//         ))}
//       </div>

//       <div>
//         <h4 className="font-bold mb-2">Price</h4>
//         <Slider
//           value={[priceRange.min, priceRange.max]}
//           onChange={handlePriceChange}
//           valueLabelDisplay="auto"
//           min={filters?.price?.min || 0}
//           max={filters?.price?.max || 100000}
//         />
//       </div>

//       <div className="flex justify-between gap-4">
//         <Button variant="outlined" fullWidth onClick={handleReset}>
//           Remove All
//         </Button>
//         <Button variant="contained" fullWidth onClick={handleApply}>
//           Apply
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default FlightFilters;


// import React, { useState, useEffect } from 'react';
// import { Checkbox, FormControlLabel, Slider, Button } from '@mui/material';

// const FlightFilters = ({ filters, onFilterChange }) => {
//   const [selectedAirlines, setSelectedAirlines] = useState([]);
//   const [selectedStops, setSelectedStops] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 100000]);

//   useEffect(() => {
//     if (filters?.priceRange) {
//       setPriceRange(filters.priceRange);
//     }
//   }, [filters]);

//   const handleApply = () => {
//     onFilterChange({
//       airlines: selectedAirlines,
//       stops: selectedStops,
//       price: priceRange,
//       isReset: false,
//     });
//   };

//   const handleReset = () => {
//     setSelectedAirlines([]);
//     setSelectedStops([]);
//     setPriceRange(filters?.priceRange || [0, 100000]);

//     onFilterChange({
//       airlines: [],
//       stops: [],
//       price: filters?.priceRange || [0, 100000],
//       isReset: true,
//     });
//   };

//   const handleAirlineToggle = (airline) => {
//     setSelectedAirlines(prev =>
//       prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
//     );
//   };

//   const handleStopToggle = (stop) => {
//     setSelectedStops(prev =>
//       prev.includes(stop) ? prev.filter(s => s !== stop) : [...prev, stop]
//     );
//   };

//   const handlePriceChange = (_, newValue) => {
//     setPriceRange(newValue);
//   };

//   return (
//     <div className="bg-white dark:bg-neutral-800 p-4 rounded-2xl shadow space-y-6">
//       <div>
//         <h4 className="font-bold mb-2">Airlines</h4>
//         <div className="max-h-40 overflow-y-auto space-y-1">
//           {filters?.carriers?.map((carrier, idx) => (
//             <FormControlLabel
//               key={idx}
//               control={
//                 <Checkbox
//                   checked={selectedAirlines.includes(carrier)}
//                   onChange={() => handleAirlineToggle(carrier)}
//                 />
//               }
//               label={carrier}
//             />
//           ))}
//         </div>
//       </div>

//       <div>
//         <h4 className="font-bold mb-2">Stops</h4>
//         {[0, 1, 2].map(stop => (
//           <FormControlLabel
//             key={stop}
//             control={
//               <Checkbox
//                 checked={selectedStops.includes(stop)}
//                 onChange={() => handleStopToggle(stop)}
//               />
//             }
//             label={`${stop} Stop${stop !== 1 ? 's' : ''}`}
//           />
//         ))}
//       </div>

//       <div>
//         <h4 className="font-bold mb-2">Price</h4>
//         <Slider
//           value={priceRange}
//           onChange={handlePriceChange}
//           valueLabelDisplay="auto"
//           min={filters?.priceRange?.[0] || 0}
//           max={filters?.priceRange?.[1] || 100000}
//         />
//       </div>

//       <div className="flex justify-between gap-4">
//         <Button variant="outlined" fullWidth onClick={handleReset}>
//           Remove All
//         </Button>
//         <Button variant="contained" fullWidth onClick={handleApply}>
//           Apply
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default FlightFilters;


// // import React, { useState, useEffect } from 'react';
// // import { FormControlLabel, Checkbox, Slider, Typography } from '@mui/material';

// // const FlightFilters = ({ filters, onFilterChange }) => {
// //   const [selectedAirlines, setSelectedAirlines] = useState([]);
// //   const [selectedStops, setSelectedStops] = useState([]);
// //   const [priceRange, setPriceRange] = useState([0, 100000]);

// //   useEffect(() => {
// //     if (filters?.price) {
// //       setPriceRange([filters.price.min, filters.price.max]);
// //     }
// //   }, [filters]);

// //   const handleAirlineChange = (airline) => {
// //     const updated = selectedAirlines.includes(airline)
// //       ? selectedAirlines.filter(a => a !== airline)
// //       : [...selectedAirlines, airline];
// //     setSelectedAirlines(updated);
// //     onFilterChange({ airlines: updated, stops: selectedStops, price: priceRange });
// //   };

// //   const handleStopChange = (stop) => {
// //     const updated = selectedStops.includes(stop)
// //       ? selectedStops.filter(s => s !== stop)
// //       : [...selectedStops, stop];
// //     setSelectedStops(updated);
// //     onFilterChange({ airlines: selectedAirlines, stops: updated, price: priceRange });
// //   };

// //   const handlePriceChange = (e, newValue) => {
// //     setPriceRange(newValue);
// //     onFilterChange({ airlines: selectedAirlines, stops: selectedStops, price: newValue });
// //   };

// //   return (
// //     <div className="space-y-4 border p-4 rounded-xl dark:bg-neutral-900">
// //       <div>
// //         <Typography variant="subtitle1">Airlines</Typography>
// //         {filters?.carriers?.map((airline) => (
// //           <FormControlLabel
// //             key={airline}
// //             control={<Checkbox onChange={() => handleAirlineChange(airline)} />}
// //             label={airline}
// //           />
// //         ))}
// //       </div>

// //       <div>
// //         <Typography variant="subtitle1">Stops</Typography>
// //         {[0, 1, 2].map((stop) => (
// //           <FormControlLabel
// //             key={stop}
// //             control={<Checkbox onChange={() => handleStopChange(stop)} />}
// //             label={`${stop} Stop${stop !== 1 ? 's' : ''}`}
// //           />
// //         ))}
// //       </div>

// //       <div>
// //         <Typography variant="subtitle1">Price</Typography>
// //         <Slider
// //           value={priceRange}
// //           onChange={handlePriceChange}
// //           min={filters?.price?.min || 0}
// //           max={filters?.price?.max || 100000}
// //           valueLabelDisplay="auto"
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default FlightFilters;
