import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cultivos, setCultivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cultivos/')
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener los cultivos');
        return response.json();
      })
      .then((data) => {
        setCultivos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Lista de Cultivos</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Distrito</th>
            <th>Fecha Siembra</th>
          </tr>
        </thead>
        <tbody>
          {cultivos.map((cultivo) => (
            <tr key={cultivo.id}>
              <td>{cultivo.id}</td>
              <td>{cultivo.nombre}</td>
              <td>{cultivo.departamento}</td>
              <td>{cultivo.distrito}</td>
              <td>{cultivo.fecha_siembra}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
