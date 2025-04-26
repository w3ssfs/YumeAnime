import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Animes from "./pages/Animes";
import TermsOfUse from "./pages/TermsOfUse";
import Contact from "./pages/Contact";
import Private from "./pages/TermsOfPrivate";
import Perfil from "./pages/PerfilPage";
import Layout from "./components/Layout";
import AnimeDetailsPage from "./pages/AnimeDetailsPage";
import Saved from "./pages/SavedPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Animes" element={<Animes />} />
          <Route path="/termos" element={<TermsOfUse />} />
          <Route path="/Contato" element={<Contact />} />
          <Route path="/Privacidade" element={<Private />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/anime/:id" element={<AnimeDetailsPage />} />
          <Route path="/Salvos" element={<Saved />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
