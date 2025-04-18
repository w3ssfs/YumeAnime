import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AnimeAdvancedFilterSection from "../components/Anime/AnimeAdvancedFilterSection";
import TopRankedSection from "../components/Ranked/TopRankedSection";
import axios from "axios";

function Animes() {
  const { data, isLoading } = useQuery({
    queryKey: ["topAnimes"],
    queryFn: async () => {
      const res = await axios.get("https://api.jikan.moe/v4/top/anime");
      return res.data.data.slice(0, 8);
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <main className="anime-page">
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <TopRankedSection topAnimes={data} />
        )}
        <AnimeAdvancedFilterSection />
      </main>
      <Footer />
    </div>
  );
}

export default Animes;
