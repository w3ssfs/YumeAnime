import { useEffect, useState } from "react";
import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FutureAnimeSection from "../components/FutureAnimeSection";

function Home() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/seasons/now")
      .then((res) => {
        setAnimes(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar lançamentos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Header />

      <FutureAnimeSection />

      <h1 className="section-title">Lançamentos da Temporada</h1>
      {loading ? (
        <p></p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          {animes.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
