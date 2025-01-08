import React, { useState } from "react";
import FormData from "./FormData.jsx";
import "./App.css";

const App = () => {
  const [countryName, setCountryName] = useState("");
  const [stateN, setStateN] = useState("");
  const [cityName, setCityName] = useState("");

  return (
    <div className="container">
      <h1>Select Location</h1>
      <FormData
        setCountryName={setCountryName}
        setStateN={setStateN}
        setCityName={setCityName}
      />
      {countryName && stateN && cityName && (
        <h1>
          You selected {countryName}, {stateN}, {cityName}
        </h1>
      )}
    </div>
  );
};

export default App;
