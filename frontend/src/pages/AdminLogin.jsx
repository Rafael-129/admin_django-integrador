import React, { useState } from "react";
import reactLogo from "../assets/react.svg";
import "../style/AdminLogin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focus, setFocus] = useState({ username: false, password: false });
  const [hover, setHover] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("adminToken", data.access);
        window.location.href = "/admin-dashboard";
      } else {
        setError("Usuario o contraseña incorrectos, o no es administrador.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="admin-login-bg">
      <div className="admin-login-card">
        <img src={reactLogo} alt="Logo" className="admin-login-logo" />
        <div className="admin-login-title">Panel Administrador</div>
        <form className="admin-login-form" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="admin-login-label">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onFocus={() => setFocus(f => ({ ...f, username: true }))}
              onBlur={() => setFocus(f => ({ ...f, username: false }))}
              className={`admin-login-input${focus.username ? " admin-login-input-focus" : ""}`}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="admin-login-label">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocus(f => ({ ...f, password: true }))}
              onBlur={() => setFocus(f => ({ ...f, password: false }))}
              className={`admin-login-input${focus.password ? " admin-login-input-focus" : ""}`}
              required
            />
          </div>
          {error && <div className="admin-login-error">{error}</div>}
          <button
            type="submit"
            className={`admin-login-button${hover ? " admin-login-button-hover" : ""}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;