import React from "react";
import "../style/AdminProfile.css";

function getAdminUsername() {
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.username || `ID: ${payload.user_id}` || "Admin";
  } catch {
    return "Admin";
  }
}

export default function AdminProfile() {
  const admin = getAdminUsername();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin-login";
  };

  // Protección de ruta
  if (!localStorage.getItem("adminToken")) {
    window.location.href = "/admin-login";
    return null;
  }

  return (
    <div className="admin-profile-bg">
      <div className="admin-profile-card">
        <div className="admin-profile-avatar">👤</div>
        <div className="admin-profile-title">Administrador</div>
        <div className="admin-profile-username">{admin}</div>
        <button className="admin-profile-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
} 