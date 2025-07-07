import { useEffect, useState } from 'react';
import DashboardChart from '../components/DashboardChart';
import { useNavigate } from 'react-router-dom';

export default function EstadisticaCultivos() {
  const [labels, setLabels] = useState([]);
  const [cultivosPorMes, setCultivosPorMes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Protección de ruta
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin-login';
      return;
    }
    fetch('https://administrador-agrotech-bakcend.onrender.com/api/cultivos/')
      .then(r => r.json())
      .then(cultivos => {
        // Procesar cultivos por mes (últimos 6 meses)
        const meses = [];
        const cultivosMes = [];
        const date = new Date();
        for (let i = 5; i >= 0; i--) {
          const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
          meses.push(d.toLocaleString('default', { month: 'short', year: '2-digit' }));
          cultivosMes.push(cultivos.filter(c => c.fecha_siembra && new Date(c.fecha_siembra).getMonth() === d.getMonth() && new Date(c.fecha_siembra).getFullYear() === d.getFullYear()).length);
        }
        setLabels(meses);
        setCultivosPorMes(cultivosMes);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Estadística de Cultivos</h1>
        <button
          onClick={() => navigate("/")}
          style={{
            marginBottom: 24,
            padding: '10px 24px',
            borderRadius: 8,
            border: 'none',
            background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #22c55e44',
            transition: 'background 0.2s, transform 0.1s',
          }}
        >
          ← Volver al Dashboard
        </button>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <DashboardChart labels={labels} dataSet={cultivosPorMes} color="#22c55e" title="Cultivos registrados por mes" label="Cultivos" />
        )}
      </div>
    </div>
  );
} 