import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Animes from "./pages/Animes";
import TermsOfUse from "./pages/TermsOfUse";
import Contact from "./pages/Contact";
import Private from "./pages/TermsOfPrivate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Animes" element={<Animes />} />
        <Route path="/termos" element={<TermsOfUse />} />
        <Route path="/Contato" element={<Contact />} />
        <Route path="/Privacidade" element={<Private />} />
      </Routes>
    </Router>
  );
}

export default App;
