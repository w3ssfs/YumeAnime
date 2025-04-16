import { useEffect, useState } from "react";
import axios from "axios";
import AnimeCard from "../components/AnimeCard";

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
      {/* Carrossel de populares */}
      <div
        style={{
          marginBottom: "40px",
          height: "300px",
          backgroundColor: "#111",
          color: "#fff",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>🎞️ Carrossel de Animes Populares (em breve)</h2>
      </div>

      <h1 style={{ color: "#fff" }}>Lançamentos da Temporada</h1>
      {loading ? (
        <p style={{ color: "#fff" }}>Carregando...</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {animes.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
