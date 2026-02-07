import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AnimeCard.css";

function AnimeCard({ anime }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);


  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;
    const rotateX = -((y - centerY) / 20);
    const rotateY = (x - centerX) / 20;
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

  const getShortTitle = (titleObj, maxLength = 30) => {
    const { title, title_english, title_synonyms = [] } = titleObj;
    let short =
      title_english && title_english.length <= maxLength
        ? title_english
        : title;
    if (short.length > maxLength && title_synonyms.length > 0) {
      short = title_synonyms[0];
    }
    return short.length > maxLength
      ? short.substring(0, maxLength - 3) + "..."
      : short;
  };

  const getStatusClass = (status) => {
    const normalized = status?.toLowerCase() || "";
    if (["airing", "em exibição"].includes(normalized)) return "airing";
    if (["finished airing", "finalizado"].includes(normalized))
      return "finished";
    if (["ongoing", "em andamento"].includes(normalized)) return "ongoing";
    return "";
  };

  const imageUrl =
    anime.images?.jpg?.image_url || anime.image || "";
    
  const genres = anime.genres || [];

  


  return (
    <Link to={`/anime/${anime.mal_id}`} className="anime-card-link">
      <div
        className={`anime-card-style-1 ${!imageLoaded ? "loading" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="anime-img-box">
          <img
            src={imageUrl}
            alt={anime.title}
            className="anime-img"
          />
          {!imageLoaded && <div className="image-skeleton" />}
          {anime.rating && (
            <div className="pg-badge">
              | {anime.rating.split("-")[0].trim()}
            </div>
          )}
        </div>


        <div className="anime-info">
          <div className="anime-top">
            <span className={`status-badge ${getStatusClass(anime.status)}`}>
              {anime.status}
            </span>
            <p className="episodes">
              {season} {year} • {anime.episodes || "?"} episódios
            </p>


          </div>

          <p className="anime-title">{getShortTitle(anime)}</p>

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
                {anime.scored_by?.toLocaleString() || "0"} usuários
              </span>
            </div>

            <div className="rank">
              <div># {anime.rank || "?"}</div>
              <span>Ranking</span>
            </div>
          </div>

          <div className="genres">
            {genres.length === 1 ? (
              <span className="genre">{genres[0].name}</span>
            ) : (
              <>
                {genres.slice(0, 2).map((genre, i) => (
                  <span key={i} className="genre">
                    {genre.name.length > 7
                      ? genre.name.slice(0, 7) + "..."
                      : genre.name}
                  </span>
                ))}
                {genres.length > 2 && (
                  <span className="genre">+{genres.length - 2}</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AnimeCard;
