import { useEffect, useState } from 'react';
import './App.css';

const TABLES = [
  {
    key: 'cultivos',
    title: 'Cultivos',
    endpoint: 'cultivos',
    columns: ['id', 'nombre', 'departamento', 'distrito', 'fecha_siembra'],
  },
  {
    key: 'usuarios',
    title: 'Usuarios',
    endpoint: 'usuarios',
    columns: ['id', 'nombre', 'apellido', 'email', 'email_verificado', 'fecha_creacion'],
  },
  {
    key: 'cosecha',
    title: 'Cosechas',
    endpoint: 'cosecha',
    columns: ['pk_cosecha', 'fk_sembrio', 'cantidad_valor', 'fecha_cosecha'],
  },
  {
    key: 'pregunta',
    title: 'Preguntas',
    endpoint: 'pregunta',
    columns: ['pk_pregunta', 'pregunta', 'respuesta'],
  },
  {
    key: 'registro_fertilizacion',
    title: 'Registro Fertilización',
    endpoint: 'registro_fertilizacion',
    columns: ['pk_fertilizacion', 'fk_sembrio', 'fecha_fertilizacion', 'tipo_fertilizante'],
  },
  {
    key: 'sembrio',
    title: 'Sembríos',
    endpoint: 'sembrio',
    columns: ['pk_sembrio', 'semilla', 'descripcion', 'fk_usuario', 'fk_tipo_suelo'],
  },
  {
    key: 'tipo_suelo',
    title: 'Tipos de Suelo',
    endpoint: 'tipo_suelo',
    columns: ['pk_tipo_suelo'],
  },
];

function Tabla({ columns, data }) {
  if (!data.length) return <div className="empty-table">Sin datos</div>;
  return (
    <div className="table-wrapper">
      <table className="styled-table">
        <thead>
          <tr>
            {columns.map(col => <th key={col}>{col.replace(/_/g, ' ').toUpperCase()}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id || row.pk_usuario || row.pk_cosecha || row.pk_pregunta || row.pk_fertilizacion || row.pk_sembrio || row.pk_tipo_suelo || idx}>
              {columns.map(col => (
                <td key={col}>
                  {typeof row[col] === 'boolean'
                    ? row[col] ? 'Sí' : 'No'
                    : row[col] !== null && row[col] !== undefined
                      ? row[col].toString()
                      : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState(TABLES[0].key);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all(
      TABLES.map(table =>
        fetch(`http://127.0.0.1:8000/api/${table.endpoint}/`)
          .then(r => r.json())
          .catch(() => [])
      )
    )
      .then(results => {
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
        <header className="header">
          <h1>
            <span role="img" aria-label="database">🌾</span> Panel de Tablas de Agricultura
          </h1>
        </header>
        <nav className="tabs">
          {TABLES.map(tab => (
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
              columns={TABLES.find(t => t.key === activeTab).columns}
              data={data[activeTab] || []}
            />
          )}
        </section>
      </div>
    </div>
  );
}



export default App;
