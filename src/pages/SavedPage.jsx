import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import AnimeCard from "../components/Anime/AnimeCard";
import "./SavedPage.css"; 

const SavedPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        
        const ref = collection(db, "users", user.uid, "favorites");
        const snap = await getDocs(ref);

        const ids = snap.docs
          .map((doc) => doc.data()?.mal_id)
          .filter(Boolean);

        if (ids.length === 0) {
          setFavorites([]);
          return;
        }

        
        const animes = await Promise.all(
          ids.map(async (id) => {
            try {
              const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
              const json = await res.json();
              return json?.data ?? null;
            } catch {
              return null;
            }
          })
        );

        setFavorites(animes.filter(Boolean));
      } catch (err) {
        console.error("Erro ao carregar favoritos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (loading) {
    return (
      <div className="saved-center">
        <p className="saved-loading">Carregando seus favoritos… ✨</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="saved-center">
        <div className="saved-empty">
          <span className="heart">♡</span>
          <h2>Nenhum anime salvo ainda</h2>
          <p>
            Quando você encontrar um anime especial,<br />
            clique no ❤️ para guardar aqui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-page">
      <header className="saved-header">
        <h1>Favoritos</h1>
        <p className="saved-stats">
          Animes salvos: <strong>{favorites.length}</strong>
        </p>
      </header>

      {loading && <p className="loading">Carregando...</p>}

      {!loading && favorites.length === 0 && (
        <div className="empty-saved">
          <h2>💜 Nenhum anime salvo ainda</h2>
          <p>Quando você salvar um anime, ele aparece aqui.</p>
        </div>
      )}

      <div className="favoritos-list">
        {favorites.map(anime => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default SavedPage;
