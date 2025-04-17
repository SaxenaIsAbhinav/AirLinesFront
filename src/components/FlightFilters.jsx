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

