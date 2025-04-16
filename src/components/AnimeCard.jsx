import { useState } from "react";
import "./AnimeCard.css";

function AnimeCard({ anime }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { offsetWidth, offsetHeight } = currentTarget;

    const rotateX = (clientY / offsetHeight - 0.5) * 10;
    const rotateY = (clientX / offsetWidth - 0.5) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const aired = anime.aired?.from ? new Date(anime.aired.from) : null;
  const year = aired?.getFullYear() || "N/A";
  const season = anime.season
    ? anime.season.charAt(0).toUpperCase() + anime.season.slice(1)
    : "N/A";

  return (
    <div
      className="anime-card-style-1"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
    >
      <div className="anime-img-box">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="anime-img"
        />
        {anime.rating && (
          <div className="pg-badge">| {anime.rating.split("-")[0].trim()}</div>
        )}
      </div>

      <div className="anime-info">
        <div className="anime-top">
          <span className="status-badge">Finished Airing</span>
          <p className="episodes">
            {season} {year} • {anime.episodes || "?"} episodes
          </p>
        </div>

        <p className="anime-title">{anime.title}</p>

        <div className="score-rank">
          <div className="score">
            <div className="score-top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="star-icon"
              >
                <path d="M12 17.75l-6.172 3.245 1.179-6.873-5-4.867 6.9-1 3.086-6.253 3.086 6.253 6.9 1-5 4.867 1.179 6.873z" />
              </svg>
              <span className="score-value">{anime.score || "?"}</span>
            </div>
            <span className="user-count">
              {anime.scored_by?.toLocaleString() || "0"} users
            </span>
          </div>

          <div className="rank">
            <div># {anime.rank || "?"}</div>
            <span>Ranking</span>
          </div>
        </div>

        <div className="genres">
          {(anime.genres || []).slice(0, 3).map((genre, i) => (
            <span key={i} className="genre">
              {genre.name}
            </span>
          ))}
          {anime.genres.length > 3 && (
            <span className="genre">+{anime.genres.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
