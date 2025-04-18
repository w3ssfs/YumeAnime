import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Animes from "./pages/Animes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Animes" element={<Animes />} />
      </Routes>
    </Router>
  );
}

export default App;
