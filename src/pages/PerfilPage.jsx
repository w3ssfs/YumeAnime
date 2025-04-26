import React, { useState } from "react";
import AnimeCard from "../components/Anime/AnimeCard";

import userImage from "../assets/user.png";
import { useQuery } from "@tanstack/react-query";
import "../components/Perfil/PerfilPage.css";

const fetchCurrentSeasonAnimes = async () => {
  const res = await fetch("https://api.jikan.moe/v4/seasons/now");
  const data = await res.json();
  return data.data;
};

const PerfilPage = () => {
  const [showAll, setShowAll] = useState(false);

  const {
    data: savedAnimes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["saved-animes"],
    queryFn: fetchCurrentSeasonAnimes,
    staleTime: 1000 * 60 * 5,
  });

  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <div className="perfil-container">
      <main className="perfil-content">
        <section className="perfil-top-card">
          <img src={userImage} alt="Avatar" className="perfil-avatar-glow" />
          <h2>user</h2>

          <button className="perfil-rank-btn">⭐ Usuário</button>
          <p className="perfil-date">Entrei em: 01 Abril 2025</p>
        </section>

        <div className="perfil-infos-grid">
          <div className="perfil-box">
            <h3>Atividade Recente</h3>
            <ul>
              <li>🟣 Assistindo: One Piece</li>
              <li>🟡 Fabricante de palavras</li>
            </ul>
          </div>

          <div className="perfil-box">
            <h3>Estatísticas</h3>
            <p>📘 0 Animes</p>
            <p>❤️ Ação</p>
          </div>

          <div className="perfil-box">
            <h3>Conquistas</h3>
            <div className="perfil-icons">
              <span>🥇</span>
              <span>💬</span>
              <span>👁️</span>
            </div>
          </div>

          <div className="perfil-box">
            <h3>Amizades</h3>
            <div className="perfil-friends">
              <img src={userImage} alt="amigo" />
              <img src={userImage} alt="amigo" />
              <img src={userImage} alt="amigo" />
              <span>+6</span>
            </div>
          </div>
        </div>

        <section className="perfil-animes-salvos">
          <h3 className="section-title">Animes Salvos</h3>
          {isLoading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p>Erro ao carregar animes salvos.</p>
          ) : (
            <>
              <div className="favoritos-wrapper">
                <div className="favoritos-list">
                  {Array.isArray(savedAnimes) &&
                    savedAnimes
                      .slice(0, showAll ? savedAnimes.length : 10)
                      .map((savedAnime) => (
                        <AnimeCard key={savedAnime.mal_id} anime={savedAnime} />
                      ))}
                </div>
              </div>

              <div className="show-more-btn">
                <button
                  onClick={toggleShowAll}
                  className="ver-mais"
                  type="button"
                >
                  {showAll ? "Ver menos" : "Ver todos"}
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default PerfilPage;
