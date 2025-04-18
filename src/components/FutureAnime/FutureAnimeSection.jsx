import React, { useEffect, useState } from "react";
import AnimeCard from "../Anime/AnimeCard";
import "./FutureAnimeSection.css";

function FutureAnimeSection() {
  const [futureAnimes, setFutureAnimes] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/seasons/upcoming")
      .then((res) => res.json())
      .then((data) => {
        const uniqueAnimes = data.data.filter(
          (anime, index, self) =>
            index === self.findIndex((a) => a.mal_id === anime.mal_id)
        );
        setFutureAnimes(uniqueAnimes);
      })
      .catch((err) => console.error("Erro ao carregar futuros:", err));
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="future-anime-section">
      <h2 className="section-title">Em breve</h2>
      <div className="anime-grid">
        {futureAnimes
          .slice(0, showAll ? futureAnimes.length : 10)
          .map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
      </div>
      <div className="show-more-btn">
        <button type="button" onClick={toggleShowAll}>
          {showAll ? "Ver menos" : "Ver todos"}
        </button>
      </div>
    </div>
  );
}

export default FutureAnimeSection;
