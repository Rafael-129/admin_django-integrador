import { useEffect, useState } from 'react';
import DashboardChart from '../components/DashboardChart';

export default function EstadisticaRecomendaciones() {
  const [labels, setLabels] = useState([]);
  const [recomendacionesPorMes, setRecomendacionesPorMes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Protección de ruta
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin-login';
      return;
    }
    fetch('http://127.0.0.1:8000/api/recomendaciones/')
      .then(r => r.json())
      .then(recomendaciones => {
        // Procesar recomendaciones por mes (últimos 6 meses)
        const meses = [];
        const recomendacionesMes = [];
        const date = new Date();
        for (let i = 5; i >= 0; i--) {
          const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
          meses.push(d.toLocaleString('default', { month: 'short', year: '2-digit' }));
          recomendacionesMes.push(recomendaciones.filter(r => r.fecha && new Date(r.fecha).getMonth() === d.getMonth() && new Date(r.fecha).getFullYear() === d.getFullYear()).length);
        }
        setLabels(meses);
        setRecomendacionesPorMes(recomendacionesMes);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Estadística de Recomendaciones</h1>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <DashboardChart labels={labels} dataSet={recomendacionesPorMes} color="#e67e22" title="Recomendaciones por mes" label="Recomendaciones" />
        )}
      </div>
    </div>
  );
} 