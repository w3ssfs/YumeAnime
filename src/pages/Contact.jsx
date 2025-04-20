import React from "react";
import "../components/TermsOfUse/TermsOfUse.css";

function Contact() {
  return (
    <>
      <main className="terms-container">
        <div className="terms-box">
          <h1 className="terms-title">Contatos</h1>
          <div className="contact-content leading-relaxed space-y-4 text-justify text-base p-4 max-w-4xl mx-auto">
            <p>
              Para entrar em contacto connosco, envie um email para: Email fora
              do ar temporariamente <br />
              Ou então, através do nosso{" "}
              <a
                href="https://discord.gg/3YRPzTBQCv"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-discord-contact "
              >
                Discord
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Contact;
