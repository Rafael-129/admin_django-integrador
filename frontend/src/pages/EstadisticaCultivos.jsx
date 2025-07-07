import { useEffect, useState } from 'react';
import DashboardChart from '../components/DashboardChart';

export default function EstadisticaCultivos() {
  const [labels, setLabels] = useState([]);
  const [cultivosPorMes, setCultivosPorMes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Protección de ruta
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin-login';
      return;
    }
    fetch('http://127.0.0.1:8000/api/cultivos/')
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
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <DashboardChart labels={labels} dataSet={cultivosPorMes} color="#22c55e" title="Cultivos registrados por mes" label="Cultivos" />
        )}
      </div>
    </div>
  );
} 