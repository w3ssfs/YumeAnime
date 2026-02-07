import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Animes from "./pages/Animes";
import TermsOfUse from "./pages/TermsOfUse";
import Contact from "./pages/Contact";
import Private from "./pages/TermsOfPrivate";
import Perfil from "./pages/PerfilPage";
import Layout from "./components/Layout";
import AnimeDetailsPage from "./pages/AnimeDetailsPage";
import Saved from "./pages/SavedPage";
import LoginPage from "./pages/LoginPage";

import ProtectedRoute from "./pages/ProtectedRouter";

function App() {
  return (
    
      <Router>
        <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Animes" element={<Animes />} />
            <Route path="/termos" element={<TermsOfUse />} />
            <Route path="/Contato" element={<Contact />} />
            <Route path="/Privacidade" element={<Private />} />
            <Route path="/anime/:id" element={<AnimeDetailsPage />} />

          
            <Route
              path="/Perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Salvos"
              element={
                <ProtectedRoute>
                  <Saved />
                </ProtectedRoute>
              }
            />

           
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
        </AuthProvider>
      </Router>
    
  );
}

export default App;
