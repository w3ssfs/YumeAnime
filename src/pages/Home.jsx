import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import AnimeCard from "../components/Anime/AnimeCard";

import FutureAnimeSection from "../components/FutureAnime/FutureAnimeSection";
import "../components/FutureAnime/FutureAnimeSection.css";

function Home() {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => setShowAll(!showAll);

  const { data = [], isLoading } = useQuery({
    queryKey: ["seasonNow"],
    queryFn: async () => {
      const res = await axios.get("https://api.jikan.moe/v4/seasons/now");
      return res.data.data.filter(
        (anime, index, self) =>
          index === self.findIndex((a) => a.mal_id === anime.mal_id)
      );
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div>
      <FutureAnimeSection />
      <h1 className="section-title">Lançamentos da Temporada</h1>
      {isLoading ? (
        <p></p>
      ) : (
        <>
          <div className="anime-grid">
            {(showAll ? data : data.slice(0, 20)).map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
          <div className="show-more-btn">
            <button onClick={toggleShowAll}>
              {showAll ? "Ver menos" : "Ver todos"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
