import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null); 
  const [dropdownValue, setDropdownValue] = useState(""); 
  const navigate = useNavigate();
  const location = useLocation();

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
      setDropdownValue(cca2); 
      navigate(`/countries/${cca2}`, { state: { data: country } });
    }
  };

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/countries") {
      setSelectedCountry(null);
      setDropdownValue(""); 
    }
  }, [location]);

  return (
    <div className="container">
      <h1>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Kingdoms of the World
        </Link>
      </h1>
      <select onChange={handleSelect} value={dropdownValue}>
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
