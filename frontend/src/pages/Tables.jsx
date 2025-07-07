import { useEffect, useState } from 'react';
import Tabla from '../components/Tabla';

const TABLES = [
  {
    key: 'usuarios',
    title: 'Usuarios',
    endpoint: 'usuarios',
    columns: [
      'id',
      'nombre_pila',
      'apellido',
      'email',
      'dominio_hd',
      'fecha_creacion',
    ],
  },
  {
    key: 'cultivos',
    title: 'Cultivos',
    endpoint: 'cultivos',
    columns: [
      'id',
      'cultivo',
      'descripcion',
      'estado',
      'fecha_siembra',
      'localidad',
      'tipo_terreno',
      'usuario',
    ],
  },
  {
    key: 'tipos-terreno',
    title: 'Tipos de Terreno',
    endpoint: 'tipos-terreno',
    columns: ['id', 'nombre'],
  },
  {
    key: 'recomendaciones',
    title: 'Recomendaciones',
    endpoint: 'recomendaciones',
    columns: ['id', 'estado', 'fecha', 'pregunta', 'respuesta', 'cultivo_id'],
  },
];

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

export default function Tables() {
  const [activeTab, setActiveTab] = useState(TABLES[0].key);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState('');

  useEffect(() => {
    // Route protection
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin-login';
      return;
    }
    setAdmin(getAdminUsername());
    setLoading(true);
    setError(null);
    Promise.all(
      TABLES.map((table) =>
        fetch(`http://127.0.0.1:8000/api/${table.endpoint}/`)
          .then((r) => r.json())
          .catch(() => [])
      )
    )
      .then((results) => {
        const newData = {};
        TABLES.forEach((table, idx) => {
          newData[table.key] = results[idx];
        });
        setData(newData);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al obtener los datos');
        setLoading(false);
      });
  }, []);

  return (
    <div className="main-bg">
      <div className="app-container">
        <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>
            <span role="img" aria-label="database">
              🌾
            </span>{' '}
            Tablas de Agricultura
          </h1>
          <div style={{ fontWeight: 500, color: '#6366f1', fontSize: 16 }}>
            <span role="img" aria-label="admin">👤</span> {admin}
          </div>
        </header>
        <nav className="tabs">
          {TABLES.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.title}
            </button>
          ))}
        </nav>
        <section className="tab-content">
          {loading ? (
            <div className="loader"></div>
          ) : error ? (
            <div className="error-msg">{error}</div>
          ) : (
            <Tabla
              columns={TABLES.find((t) => t.key === activeTab).columns}
              data={data[activeTab] || []}
            />
          )}
        </section>
      </div>
    </div>
  );
}
