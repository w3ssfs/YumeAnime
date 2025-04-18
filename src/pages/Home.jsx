import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AnimeCard from "../components/Anime/AnimeCard";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import FutureAnimeSection from "../components/FutureAnime/FutureAnimeSection";

function Home() {
  const { data, isLoading } = useQuery({
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
      <Header />
      <FutureAnimeSection />
      <h1 className="section-title">Lançamentos da Temporada</h1>
      {isLoading ? (
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
          {data.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
