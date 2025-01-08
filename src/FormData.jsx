import React, { useEffect, useState } from "react";
import "./App.css";

const FormData = ({ setCountryName, setStateN, setCityName }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    // Fetch countries
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://xcountries-backend.azurewebsites.net/all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]); // Set countries to empty array on error
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setCountryName(selectedCountry);
      // Fetch states based on selected country
      const fetchStates = async () => {
        try {
          const response = await fetch(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
          );
          const data = await response.json();
          setStates(data);
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      };
      fetchStates();
    }
  }, [selectedCountry, setCountryName]);

  useEffect(() => {
    if (selectedState) {
      setStateN(selectedState);
      // Fetch cities based on selected state
      const fetchCities = async () => {
        try {
          const response = await fetch(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
          );
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };
      fetchCities();
    }
  }, [selectedState, setStateN]);

  useEffect(() => {
    if (selectedCity) {
      setCityName(selectedCity);
    }
  }, [selectedCity, setCityName]);

  return (
    <div>
      <form className="form">
        <select
          name="country"
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="" disabled>
            Select your country
          </option>
          {countries.length > 0 &&
            countries.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name}
              </option>
            ))}
        </select>
        <select
          name="state"
          id="state"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select your state
          </option>
          {states.length > 0 &&
            states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
        </select>
        <select
          name="city"
          id="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="" disabled>
            Select your city
          </option>
          {cities.length > 0 &&
            cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
        </select>
      </form>
    </div>
  );
};

export default FormData;
