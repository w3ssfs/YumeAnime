import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const { login, register, loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const resetMessages = () => {
    setError("");
  };

  const handleLogin = async () => {
    resetMessages();

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Email inválido");
      return;
    }

    try {
      setLoading(true);
      await login(email.trim(), password);
    } catch {
      setError("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    resetMessages();

    if (!email || !nickname || !password || !confirmPassword) {
      setError("Preencha todos os campos");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Email inválido");
      return;
    }

    if (nickname.trim().length < 3) {
      setError("Nickname deve ter no mínimo 3 caracteres");
      return;
    }

    if (nickname.includes(" ")) {
      setError("Nickname não pode conter espaços");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      setLoading(true);
      await register(email.trim(), password, nickname.trim());
    } catch (err) {
      setError("Este email já está em uso");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    resetMessages();
    try {
      setLoading(true);
      await loginWithGoogle();
    } catch {
      setError("Erro ao entrar com Google");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegister(!isRegister);
    setEmail("");
    setNickname("");
    setPassword("");
    setConfirmPassword("");
    resetMessages();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isRegister ? "Criar Conta" : "Entrar"}</h2>

        {error && <div className="login-error">{error}</div>}

        {isRegister && (
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isRegister && (
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {!isRegister ? (
          <>
            <button
              className="btn-primary"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <button
              className="btn-google"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Entrar com Google
            </button>
          </>
        ) : (
          <button
            className="btn-primary"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>
        )}

        <span className="login-switch" onClick={switchMode}>
          {isRegister
            ? "Já tem conta? Entrar"
            : "Não tem conta? Criar agora"}
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
