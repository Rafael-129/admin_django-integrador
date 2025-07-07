import { useEffect, useState } from 'react';
import DashboardChart from '../components/DashboardChart';
import { useNavigate } from 'react-router-dom';

export default function EstadisticaUsuariosActivos() {
  const [labels, setLabels] = useState([]);
  const [activosPorMes, setActivosPorMes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Protección de ruta
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin-login';
      return;
    }
    fetch('http://127.0.0.1:8000/api/usuarios/')
      .then(r => r.json())
      .then(usuarios => {
        // Procesar usuarios activos por mes (últimos 6 meses)
        const meses = [];
        const activosMes = [];
        const date = new Date();
        for (let i = 5; i >= 0; i--) {
          const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
          meses.push(d.toLocaleString('default', { month: 'short', year: '2-digit' }));
          activosMes.push(usuarios.filter(u => u.ultimo_login && new Date(u.ultimo_login).getMonth() === d.getMonth() && new Date(u.ultimo_login).getFullYear() === d.getFullYear()).length);
        }
        setLabels(meses);
        setActivosPorMes(activosMes);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Usuarios Activos</h1>
        <button
          onClick={() => navigate("/")}
          style={{
            marginBottom: 24,
            padding: '10px 24px',
            borderRadius: 8,
            border: 'none',
            background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #6366f144',
            transition: 'background 0.2s, transform 0.1s',
          }}
        >
          ← Volver al Dashboard
        </button>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <DashboardChart labels={labels} dataSet={activosPorMes} color="#6366f1" title="Usuarios activos por mes" label="Activos" />
        )}
      </div>
    </div>
  );
} 