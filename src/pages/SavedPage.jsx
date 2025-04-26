import React, { useState } from "react";
import AnimeCard from "../components/Anime/AnimeCard";
import { useQuery } from "@tanstack/react-query";
import "../components/Perfil/PerfilPage.css";

const fetchAnimesThisYear = async () => {
  const res = await fetch(
    "https://api.jikan.moe/v4/anime?start_date=2025-01-01&end_date=2025-12-31"
  );
  const data = await res.json();
  return data.data;
};

const SavedPage = () => {
  const [showAll, setShowAll] = useState(false);

  const {
    data: savedAnimes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["saved-animes-this-year"],
    queryFn: fetchAnimesThisYear,
    staleTime: 1000 * 60 * 5,
  });

  const displayedAnimes = showAll ? savedAnimes : savedAnimes.slice(0, 15);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <div className="perfil-container">
      <main className="perfil-content">
        <h2 className="section-title">📚 Animes de 2025</h2>

        {isLoading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>Erro ao carregar animes.</p>
        ) : (
          <div>
            <div className="favoritos-list">
              {displayedAnimes.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>

            {savedAnimes.length > 10 && (
              <div className="show-more-btn">
                {showAll ? (
                  <button
                    onClick={handleShowLess}
                    className="perfil-rank-btn"
                    type="button"
                  >
                    Ver Menos
                  </button>
                ) : (
                  <button
                    onClick={handleShowMore}
                    className="perfil-rank-btn"
                    type="button"
                  >
                    Ver Mais
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedPage;
