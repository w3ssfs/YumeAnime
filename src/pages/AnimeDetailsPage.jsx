import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "../components/Anime/AnimeDetailsPage.css";
import React, { useState } from "react";
const fetchAnimeDetails = async (id) => {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  const data = await res.json();
  return data.data;
};

const AnimeDetailsPage = () => {
  const [showTrailer, setShowTrailer] = useState(false);

  const { id } = useParams();
  const {
    data: anime,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["anime", id],
    queryFn: () => fetchAnimeDetails(id),
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar anime.</p>;

  return (
    <>
      <div className="anime-details-card">
        <div className="anime-cover">
          <img src={anime.images.jpg.large_image_url} alt={anime.title} />
        </div>

        <div className="anime-info-box">
          <h1 className="anime-title-pf">
            {anime.title_english || anime.title_synonyms?.[0] || anime.title}
          </h1>

          <div className="anime-info-pf">
            <p>{anime.status}</p>
            <p>
              {anime.season} {new Date(anime.aired.from).getFullYear()}
            </p>
            <p>{anime.episodes || "? "} eps</p>
          </div>

          <div className="anime-stats">
            <div className="stat">
              <span className="stat-title">Score</span>
              <span className="stat-value">{anime.score || "N/A"}</span>
              <span className="stat-extra">
                {anime.scored_by?.toLocaleString()} users
              </span>
            </div>

            <div className="stat">
              <span className="stat-title">Ranked</span>
              <span className="stat-value">
                {anime.rank ? `#${anime.rank}` : "N/A"}
              </span>
            </div>

            <div className="stat">
              <span className="stat-title">Popularity</span>
              <span className="stat-value">
                {anime.popularity ? `#${anime.popularity}` : "N/A"}
              </span>
            </div>

            <div className="stat">
              <span className="stat-title">Members</span>
              <span className="stat-value">
                {anime.members?.toLocaleString() || "N/A"}
              </span>
            </div>
          </div>

          <div className="genres-pf">
            {anime.genres.slice(0, 10).map((genre, index) => (
              <span key={index} className="genre-pf">
                {genre.name.length > 15
                  ? genre.name.slice(0, 12) + "..."
                  : genre.name}
              </span>
            ))}
            {anime.genres.length > 10 && (
              <span className="genre-pf">+{anime.genres.length - 10}</span>
            )}
          </div>

          <p className="synopsis">{anime.synopsis}</p>
        </div>
      </div>
      {anime.trailer && anime.trailer.embed_url && (
        <div className="trailer-card">
          <iframe
            className={`trailer-video ${showTrailer ? "show" : ""}`} // Aplica a classe "show" ao iframe
            src={anime.trailer.embed_url + "?autoplay=1"}
            title="Trailer"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  );
};

export default AnimeDetailsPage;
