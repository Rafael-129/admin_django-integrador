import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Tables from '../pages/Tables';
import AdminLogin from '../pages/AdminLogin';
import AdminProfile from '../pages/AdminProfile';
import AdminRegister from '../pages/AdminRegister';
import EstadisticaUsuarios from '../pages/EstadisticaUsuarios';
import EstadisticaCultivos from '../pages/EstadisticaCultivos';
import EstadisticaRecomendaciones from '../pages/EstadisticaRecomendaciones';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <nav style={{ background: '#4f8cff', padding: '1rem', marginBottom: 0 }}>
        <Link to="/" style={{ color: '#fff', marginRight: 20, fontWeight: 600, textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/tablas" style={{ color: '#fff', marginRight: 20, fontWeight: 600, textDecoration: 'none' }}>Tablas</Link>
        <Link to="/admin-profile" style={{ color: '#fff', marginRight: 20, fontWeight: 600, textDecoration: 'none' }}>Perfil</Link>
        <Link to="/admin-register" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}>Registrar Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tablas" element={<Tables />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/estadisticas/usuarios" element={<EstadisticaUsuarios />} />
        <Route path="/estadisticas/cultivos" element={<EstadisticaCultivos />} />
        <Route path="/estadisticas/recomendaciones" element={<EstadisticaRecomendaciones />} />
      </Routes>
    </BrowserRouter>
  );
}
