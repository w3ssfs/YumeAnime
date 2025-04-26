import { NavLink } from "react-router-dom";
import "../Ranked/TopRanked.css";

function TopRankedSection({ topAnimes }) {
  return (
    <div className="top-anime-section">
      {topAnimes.map((anime) => (
        <NavLink
          to={`/anime/${anime.mal_id}`}
          className="top-anime-card"
          style={{
            backgroundImage: `url(${anime.images.jpg.large_image_url})`,
          }}
          key={anime.mal_id}
        >
          <div className="overlay">
            <h3>{anime.title}</h3>
            <p>Score: {anime.score}</p>
            <div className="genres">
              {anime.genres.map((g) => (
                <span className="genre" key={g.mal_id}>
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default TopRankedSection;
