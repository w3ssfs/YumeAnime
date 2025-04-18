import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import userImage from "../../assets/user.png";
import logoImage from "../../assets/logoYume.png";
import { FaDiscord } from "react-icons/fa";

import { FaSearch, FaEnvelope } from "react-icons/fa";

function Header() {
  return (
    <header className="main-header">
      <div className="left-section">
        <NavLink to="/">
          <img src={logoImage} alt="Logo" className="logo" />
        </NavLink>
      </div>

      <nav className="center-section">
        <NavLink to="/" className={({ isActive }) => (isActive ? "ativo" : "")}>
          Home
        </NavLink>
        <NavLink
          to="/Animes"
          className={({ isActive }) => (isActive ? "ativo" : "")}
        >
          Animes
        </NavLink>
        <NavLink
          to="/salvos"
          className={({ isActive }) => (isActive ? "ativo" : "")}
        >
          Salvos
        </NavLink>
        <NavLink
          to="/amigos"
          className={({ isActive }) => (isActive ? "ativo" : "")}
        >
          Amigos
        </NavLink>
        <a
          href="https://discord.gg/3YRPzTBQCv"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-discord"
        >
          <FaDiscord className="icon" />
          <span>Discord</span>
        </a>

        <NavLink
          to="/contato"
          className={({ isActive }) => (isActive ? "ativo" : "")}
        >
          Contato
        </NavLink>
      </nav>

      <div className="right-section">
        <div className="search-box">
          <input type="text" placeholder="Procurar anime..." />
          <FaSearch className="search-icon" />
        </div>
        <FaEnvelope className="icon envelope-icon" />
        <NavLink to="/perfil">
          <img src={userImage} alt="Perfil" className="profile-pic" />
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
