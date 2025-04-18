import React from "react";
import "./Footer.css";
import logoImage from "../../assets/logoYume.png";

function Footer() {
  return (
    <footer className="main-footer">
      <img src={logoImage} alt="Logo YumeAnime" className="footer-logo" />
      <p className="footer-copy">
        © Copyright YumeAnime 2025 - Todos os direitos reservados
      </p>
      <nav className="footer-links">
        <a href="/">Home</a>
        <a href="/salvos">Salvos</a>
        <a href="/privacidade">Política de Privacidade</a>
        <a href="/termos">Termos de Uso</a>
        <a href="/contato">Contato</a>
      </nav>
    </footer>
  );
}

export default Footer;
