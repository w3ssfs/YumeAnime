import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimeAdvancedFilterSection from "../components/AnimeAdvancedFilterSection";
// import AnimeGrid from "../components/AnimeGrid";
import TopRankedSection from "../components/TopRankedSection";

function Animes() {
  const [topAnimes, setTopAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/top/anime")
      .then((res) => {
        setTopAnimes(res.data.data.slice(0, 8));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar top animes:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <main className="anime-page">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <TopRankedSection topAnimes={topAnimes} />
        )}
        <AnimeAdvancedFilterSection />
      </main>
      <Footer />
    </div>
  );
}

export default Animes;
