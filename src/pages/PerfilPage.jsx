import userImage from "../assets/user.png";
import "../components/Perfil/PerfilPage.css";
import { useAuth } from "../context/AuthContext";

const PerfilPage = () => {

  const { user, logout } = useAuth();

  return (
    <div className="perfil-container">
      <main className="perfil-content">
        <section className="perfil-top-card">
          <img
            src={user?.photoURL || `https://api.dicebear.com/7.x/identicon/svg?seed=${user?.uid}`}
            alt="Avatar"
            className="perfil-avatar-glow"
          />
          <h2>{user?.nickname || "Usuário"}</h2>
          <p>{user.email}</p>
          <button onClick={logout} className="btn-logout">
            Sair da conta
          </button>

          <button className="perfil-rank-btn">⭐ Usuário</button>
          <p className="perfil-date">
            Entrei em:{" "}
            {user?.createdAt instanceof Date
              ? user.createdAt.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              : "—"}
          </p>
        </section>

        
      </main>
    </div>
  );
};

export default PerfilPage;
