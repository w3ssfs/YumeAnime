import React, { useState, useEffect } from "react";
import AnimeCard from "./AnimeCard";
import "./AnimeFilterSection.css";

const FILTERS = {
  top: "https://api.jikan.moe/v4/top/anime",
  airing: "https://api.jikan.moe/v4/seasons/now",
  upcoming: "https://api.jikan.moe/v4/seasons/upcoming",
};

function AnimeFilterSection() {
  const [filter, setFilter] = useState("top");
  const [animes, setAnimes] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(FILTERS[filter])
      .then((res) => res.json())
      .then((data) => setAnimes(data.data))
      .catch((err) => console.error("Erro ao carregar animes:", err));
  }, [filter]);

  const toggleShowAll = () => setShowAll((prev) => !prev);
  return (
    <div className="anime-filter-section">
      <div className="filter-menu">
        {Object.keys(FILTERS).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={filter === key ? "active" : ""}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      <div className="anime-grid">
        {Array.isArray(animes) &&
          animes
            .slice(0, showAll ? animes.length : 10)
            .map((anime) => <AnimeCard key={anime.mal_id} anime={anime} />)}
      </div>

      <div className="show-more-btn">
        <button onClick={toggleShowAll}>
          {showAll ? "Ver menos" : "Ver todos"}
        </button>
      </div>
    </div>
  );
}

export default AnimeFilterSection;
