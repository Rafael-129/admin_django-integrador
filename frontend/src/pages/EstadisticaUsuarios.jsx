import { useEffect, useState } from 'react';
import DashboardChart from '../components/DashboardChart';
import { useNavigate } from 'react-router-dom';

export default function EstadisticaUsuarios() {
  const [labels, setLabels] = useState([]);
  const [usuariosPorMes, setUsuariosPorMes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Protección de ruta
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin-login';
      return;
    }
    fetch('https://administrador-agrotech-bakcend.onrender.com/api/usuarios/')
      .then(r => r.json())
      .then(usuarios => {
        // Procesar usuarios registrados por mes (últimos 6 meses)
        const meses = [];
        const usuariosMes = [];
        const date = new Date();
        for (let i = 5; i >= 0; i--) {
          const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
          meses.push(d.toLocaleString('default', { month: 'short', year: '2-digit' }));
          usuariosMes.push(usuarios.filter(u => u.fecha_creacion && new Date(u.fecha_creacion).getMonth() === d.getMonth() && new Date(u.fecha_creacion).getFullYear() === d.getFullYear()).length);
        }
        setLabels(meses);
        setUsuariosPorMes(usuariosMes);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Usuarios Registrados</h1>
        <button
          onClick={() => navigate("/")}
          style={{
            marginBottom: 24,
            padding: '10px 24px',
            borderRadius: 8,
            border: 'none',
            background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #60a5fa44',
            transition: 'background 0.2s, transform 0.1s',
          }}
        >
          ← Volver al Dashboard
        </button>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <DashboardChart labels={labels} dataSet={usuariosPorMes} color="#3b82f6" title="Usuarios registrados por mes" label="Registrados" />
        )}
      </div>
    </div>
  );
} 