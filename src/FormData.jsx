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
    try {
      fetch("https://xcountries-backend.azurewebsites.net/all")
        .then((response) => response.json())
        .then((data) => {
          setCountries(data);
        })
        .catch((error) => console.error("Error fetching countries:", error));
    } catch (error) {
      console.error("Error: ", error.message);
    }
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setCountryName(selectedCountry);
      // Fetch states based on selected country
      try {
        fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
          .then((response) => response.json())
          .then((data) => {
            setStates(data);
          })
          .catch((error) => console.error("Error fetching states:", error));
      } catch (error) {
        console.error("Error: ", error.message);
      }
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setStateN(selectedState);
      // Fetch cities based on selected state
      try {
        fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
          .then((response) => response.json())
          .then((data) => {
            setCities(data);
          })
          .catch((error) => console.error("Error fetching cities:", error));
      } catch (error) {
        console.error("Error: ", error.message);
      }
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedCity) {
      setCityName(selectedCity);
    }
  }, [selectedCity]);

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
