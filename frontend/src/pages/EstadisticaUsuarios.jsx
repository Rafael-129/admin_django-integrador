import { useEffect, useState } from 'react';
import DashboardChart from '../components/DashboardChart';

export default function EstadisticaUsuarios() {
  const [labels, setLabels] = useState([]);
  const [usuariosPorMes, setUsuariosPorMes] = useState([]);
  const [loading, setLoading] = useState(true);

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
        // Procesar usuarios por mes (últimos 6 meses)
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
        <h1 className="dashboard-title">Estadística de Usuarios</h1>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <DashboardChart labels={labels} dataSet={usuariosPorMes} color="#3b82f6" title="Usuarios registrados por mes" label="Usuarios" />
        )}
      </div>
    </div>
  );
} 