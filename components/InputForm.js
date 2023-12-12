import React, { useState, useEffect } from 'react';

const InputForm = () => {
  const [place, setPlace] = useState('');
  const [dish, setDish] = useState('');
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    setIsSubmitEnabled(place.trim() !== '' || dish.trim() !== '');
  }, [place, dish]);

  const handlePlaceChange = async (value) => {
    setPlace(value);

    if (value.length >= 3) {
      try {
        // Simulating fetching nearby places from an API
        const suggestions = await fetchNearbyPlaces(value);
        setPlaceSuggestions(suggestions);
      } catch (error) {
        console.error('Error fetching nearby places:', error);
      }
    } else {
      setPlaceSuggestions([]);
    }
  };

  const fetchNearbyPlaces = async (query) => {
    // Simulating API call, replace with actual API call in your application
    return new Promise((resolve) => {
      const suggestions = ['Place 1', 'Place 2', 'Place 3']; // Replace with actual suggestions
      resolve(suggestions);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', { place, dish });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <div>
          <label>
            Place:
            <input
              type="text"
              name="place"
              value={place}
              onChange={(e) => handlePlaceChange(e.target.value)}
            />
          </label>
          {placeSuggestions.length > 0 && (
            <ul>
              {placeSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label>
            Dish:
            <input
              type="text"
              name="dish"
              value={dish}
              onChange={(e) => setDish(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit" disabled={!isSubmitEnabled}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
