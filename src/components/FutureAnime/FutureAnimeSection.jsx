import React, { useState } from "react";
import AnimeCard from "../Anime/AnimeCard";
import "./FutureAnimeSection.css";
import { useQuery } from "@tanstack/react-query";

const fetchUpcomingAnimes = async () => {
  const res = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
  const data = await res.json();
  return data.data.filter(
    (anime, index, self) =>
      index === self.findIndex((a) => a.mal_id === anime.mal_id)
  );
};

function FutureAnimeSection() {
  const [showAll, setShowAll] = useState(false);

  const {
    data: futureAnimes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["future-animes"],
    queryFn: fetchUpcomingAnimes,
    staleTime: 1000 * 60 * 5,
  });

  const toggleShowAll = () => setShowAll(!showAll);

  if (isLoading) return <p></p>;
  if (error) return <p>Erro ao carregar animes futuros.</p>;

  return (
    <div className="future-anime-section">
      <h2 className="section-title">Em breve</h2>
      <div className="anime-grid ">
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
