import React, { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";
import "./AnimeFilterSection.css";

const genres = [
  "all",
  "action",
  "adventure",
  "avant garde",
  "cars",
  "comedy",
  "dementia",
  "demons",
  "mystery",
  "drama",
  "ecchi",
  "fantasy",
  "game",
  "harem",
  "hentai",
  "historical",
  "horror",
  "kids",
  "magic",
  "martial arts",
  "mecha",
  "military",
  "music",
  "parody",
  "police",
  "psychological",
  "romance",
  "samurai",
  "school",
  "sci-fi",
  "seinen",
  "shoujo",
  "shoujo ai",
  "shounen",
  "shounen ai",
  "slice of life",
  "space",
  "sports",
  "super power",
  "supernatural",
  "thriller",
  "vampire",
  "yaoi",
  "yuri",
  "gourmet",
];

const seasons = ["all", "winter", "spring", "summer", "fall"];
const currentYear = new Date().getFullYear();
const earliestYear = 1950;
const years = Array.from(
  { length: currentYear - earliestYear + 1 },
  (_, i) => currentYear - i
);

function AnimeAdvancedFilterSection() {
  const [genre, setGenre] = useState("all");
  const [year, setYear] = useState("");
  const [season, setSeason] = useState("all");
  const [animes, setAnimes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!year) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        let results = [];

        if (season !== "all") {
          const res = await fetch(
            `https://api.jikan.moe/v4/seasons/${year}/${season}`
          );
          const data = await res.json();
          results = data.data || [];
        } else {
          const seasonResults = await Promise.all(
            ["winter", "spring", "summer", "fall"].map(async (s) => {
              const res = await fetch(
                `https://api.jikan.moe/v4/seasons/${year}/${s}`
              );
              const data = await res.json();
              return data.data || [];
            })
          );
          const flatResults = seasonResults.flat().filter(Boolean);
          const uniqueMap = new Map();

          flatResults.forEach((anime) => {
            if (!uniqueMap.has(anime.mal_id)) {
              uniqueMap.set(anime.mal_id, anime);
            }
          });

          results = Array.from(uniqueMap.values());
        }

        const filtered =
          genre !== "all"
            ? results.filter(
                (anime) =>
                  anime &&
                  Array.isArray(anime.genres) &&
                  anime.genres.some((g) =>
                    g.name.toLowerCase().includes(genre.toLowerCase())
                  )
              )
            : results;

        setAnimes(filtered);
      } catch (error) {
        console.error("Erro ao buscar animes:", error);
        setAnimes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genre, year, season]);

  const toggleShowAll = () => setShowAll((prev) => !prev);

  return (
    <div className="anime-filter-section">
      <div className="filter-menu">
        <select onChange={(e) => setGenre(e.target.value)} value={genre}>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g === "all"
                ? "Todos os Gêneros"
                : g.charAt(0).toUpperCase() + g.slice(1)}
            </option>
          ))}
        </select>

        <select onChange={(e) => setYear(e.target.value)} value={year}>
          <option value="">Selecione o ano</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSeason(e.target.value)} value={season}>
          {seasons.map((s) => (
            <option key={s} value={s}>
              {s === "all"
                ? "Todas as Temporadas"
                : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="anime-grid">
        {loading ? (
          <div className="anime-card loading-card">
            <p>🔍 Buscando animes...</p>
          </div>
        ) : (
          animes
            .filter((anime) => anime && anime.mal_id)
            .slice(0, showAll ? animes.length : 10)
            .map((anime) => <AnimeCard key={anime.mal_id} anime={anime} />)
        )}
      </div>

      {!loading && animes.length > 10 && (
        <div className="show-more-btn">
          <button onClick={toggleShowAll}>
            {showAll ? "Ver menos" : "Ver todos"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AnimeAdvancedFilterSection;
