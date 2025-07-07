import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Tables from '../pages/Tables';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <nav style={{ background: '#4f8cff', padding: '1rem', marginBottom: 0 }}>
        <Link to="/" style={{ color: '#fff', marginRight: 20, fontWeight: 600, textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/tablas" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}>Tablas</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tablas" element={<Tables />} />
      </Routes>
    </BrowserRouter>
  );
}
