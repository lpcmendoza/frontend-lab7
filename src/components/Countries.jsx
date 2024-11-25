import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/name/kingdom");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleSelect = (e) => {
    const cca2 = e.target.value;
    const country = countries.find((country) => country.cca2 === cca2);
    if (country) {
      setSelectedCountry(country);
      navigate(`/countries/${cca2}`, { state: { data: country } });
    }
  };

  return (
    <div className="container">
      <h1>World Kingdoms</h1>
      <select onChange={handleSelect} defaultValue="">
        <option value="" disabled>
          Select a country
        </option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name.common}
          </option>
        ))}
      </select>
      {selectedCountry && <Outlet />} 
    </div>
  );
};

export default Countries;
