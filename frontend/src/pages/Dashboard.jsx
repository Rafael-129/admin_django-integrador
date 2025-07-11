import { useEffect, useState } from 'react';
import '../style/Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Card({ title, value, icon, color, onClick }) {
  return (
    <button
      className="dashboard-card clickable"
      style={{ borderColor: color, cursor: 'pointer' }}
      onClick={onClick}
    >
      <div className="dashboard-card-icon" style={{ color }}>{icon}</div>
      <div className="dashboard-card-value">{value}</div>
      <div className="dashboard-card-title">{title}</div>
    </button>
  );
}

function getAdminUsername() {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.username || `ID: ${payload.user_id}` || 'Admin';
  } catch {
    return 'Admin';
  }
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    usuarios: 0,
    usuariosActivos: 0,
    cultivos: 0,
    recomendaciones: 0,
  });
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Route protection
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin-login';
      return;
    }
    setAdmin(getAdminUsername());
    Promise.all([
      fetch('https://administrador-agrotech-bakcend.onrender.com/api/usuarios/').then(r => r.json()),
      fetch('https://administrador-agrotech-bakcend.onrender.com/api/cultivos/').then(r => r.json()),
      fetch('https://administrador-agrotech-bakcend.onrender.com/api/recomendaciones/').then(r => r.json()),
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="dashboard-title">Panel de Administración</h1>
          <div style={{ fontWeight: 500, color: '#6366f1', fontSize: 16 }}>
            <span role="img" aria-label="admin">👤</span> {admin}
          </div>
        </div>
        <div className="dashboard-cards">
          <Card title="Usuarios registrados" value={loading ? '...' : stats.usuarios} icon="👤" color="#4f8cff" onClick={() => navigate('/estadisticas/usuarios-registrados')} />
          <Card title="Usuarios activos (7 días)" value={loading ? '...' : stats.usuariosActivos} icon="✅" color="#6366f1" onClick={() => navigate('/estadisticas/usuarios-activos')} />
          <Card title="Cultivos registrados" value={loading ? '...' : stats.cultivos} icon="🌱" color="#f39c12" onClick={() => navigate('/estadisticas/cultivos')} />
          <Card title="Recomendaciones" value={loading ? '...' : stats.recomendaciones} icon="💬" color="#e67e22" onClick={() => navigate('/estadisticas/recomendaciones')} />
        </div>
        <div className="dashboard-footer">
          <b>Panel de métricas para administradores</b>
        </div>
      </div>
    </div>
  );
}
       