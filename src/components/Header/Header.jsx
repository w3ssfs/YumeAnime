import { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import logoImage from "../../assets/logoYume.png";
import { FaDiscord, FaSearch, FaEnvelope } from "react-icons/fa";
import { Menu, X } from "lucide-react";

import { useAuth } from "./../../context/AuthContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenu = () => {
    setMenuOpen(false); 
  };

  const { user } = useAuth();
   
  return (
    <header className="main-header">
      <div className="left-section">
        <NavLink to="/" onClick={closeMenu}>
          <img src={logoImage} alt="Logo" className="logo" />
        </NavLink>

        <div className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <X /> : <Menu />}
        </div>
      </div>

      <nav className={`center-section ${menuOpen ? "active" : ""}`}>
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "ativo" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/Animes"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "ativo" : "")}
        >
          Animes
        </NavLink>
        <NavLink
          to="/salvos"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "ativo" : "")}
        >
          Salvos
        </NavLink>
        {/* <NavLink
          to="/amigos"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "ativo" : "")}
        >
          Amigos
        </NavLink> */}
        <a
          href="https://discord.gg/3YRPzTBQCv"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-discord"
          onClick={closeMenu}
        >
          <FaDiscord className="icon" />
          <span>Discord</span>
        </a>
        <NavLink
          to="/contato"
          onClick={closeMenu}
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
          <img
            src={user?.photoURL || `https://api.dicebear.com/7.x/identicon/svg?seed=${user?.uid}`}
            alt="Avatar"
            className="profile-pic"
          />

        </NavLink>
      </div>
    </header>
  );
}

export default Header;
