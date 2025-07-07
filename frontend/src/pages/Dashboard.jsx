import { useEffect, useState } from 'react';
import '../style/Dashboard.css';

function Card({ title, value, icon, color }) {
  return (
    <div className="dashboard-card" style={{ borderColor: color }}>
      <div className="dashboard-card-icon" style={{ color }}>{icon}</div>
      <div className="dashboard-card-value">{value}</div>
      <div className="dashboard-card-title">{title}</div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    usuarios: 0,
    usuariosActivos: 0,
    cultivos: 0,
    recomendaciones: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://127.0.0.1:8000/api/usuarios/').then(r => r.json()),
      fetch('http://127.0.0.1:8000/api/cultivos/').then(r => r.json()),
      fetch('http://127.0.0.1:8000/api/recomendaciones/').then(r => r.json()),
    ]).then(([usuarios, cultivos, recomendaciones]) => {
      const now = new Date();
      const activos = usuarios.filter(u => u.ultimo_login && (
        (new Date(u.ultimo_login)).getTime() > now.getTime() - 7 * 24 * 60 * 60 * 1000
      ));
      setStats({
        usuarios: usuarios.length,
        usuariosActivos: activos.length,
        cultivos: cultivos.length,
        recomendaciones: recomendaciones.length,
      });
      setLoading(false);
    });
  }, []);

  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Panel de Administración</h1>
        <div className="dashboard-cards">
          <Card title="Usuarios registrados" value={loading ? '...' : stats.usuarios} icon="👤" color="#4f8cff" />
          <Card title="Usuarios activos (7 días)" value={loading ? '...' : stats.usuariosActivos} icon="✅" color="#2ecc71" />
          <Card title="Cultivos registrados" value={loading ? '...' : stats.cultivos} icon="🌱" color="#f39c12" />
          <Card title="Recomendaciones" value={loading ? '...' : stats.recomendaciones} icon="💬" color="#e67e22" />
        </div>
        <div className="dashboard-footer">
          <b>Panel de métricas para administradores</b>
        </div>
      </div>
    </div>
  );
}
       