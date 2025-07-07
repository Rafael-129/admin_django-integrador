import React, { useState } from "react";
import "../style/AdminRegister.css";

export default function AdminRegister() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Protección: solo superusuarios pueden ver este formulario
  if (!localStorage.getItem("adminToken")) {
    window.location.href = "/admin-login";
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("https://administrador-agrotech-bakcend.onrender.com/api/create-admin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess("Administrador creado exitosamente.");
        setForm({ username: "", email: "", password: "" });
      } else {
        const data = await res.json();
        setError(
          data?.username?.[0] || data?.email?.[0] || data?.password?.[0] || "Error al crear administrador."
        );
      }
    } catch {
      setError("Error de conexión con el servidor.");
    }
    setLoading(false);
  };

  return (
    <div className="admin-register-bg">
      <div className="admin-register-card">
        <h2 className="admin-register-title">Registrar Administrador</h2>
        <form className="admin-register-form" onSubmit={handleSubmit} autoComplete="off">
          <label className="admin-register-label">Usuario</label>
          <input
            className="admin-register-input"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <label className="admin-register-label">Email</label>
          <input
            className="admin-register-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label className="admin-register-label">Contraseña</label>
          <input
            className="admin-register-input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <div className="admin-register-error">{error}</div>}
          {success && <div className="admin-register-success">{success}</div>}
          <button className="admin-register-button" type="submit" disabled={loading}>
            {loading ? "Creando..." : "Registrar"}
          </button>
        </form>
      </div>
    </div>
  );
} 