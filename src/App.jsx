import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Countries from "./components/Countries";
import Details from "./components/Details";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Countries />}>
          <Route path="countries" element={<Countries />} />
          <Route path="countries/:cca2" element={<Details />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
