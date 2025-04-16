import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
// outras páginas...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* outras rotas aqui */}
      </Routes>
    </Router>
  );
}

export default App;
