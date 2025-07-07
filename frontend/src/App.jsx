import { useEffect, useState } from 'react';
import './App.css';

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

function Tabla({ columns, data }) {
	if (!data.length) return <div className="empty-table">Sin datos</div>;
	return (
		<div className="table-wrapper">
			<table className="styled-table">
				<thead>
					<tr>
						{columns.map((col) => (
							<th key={col}>{col.replace(/_/g, ' ').toUpperCase()}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, idx) => (
						<tr key={row.id || idx}>
							{columns.map((col) => (
								<td key={col}>
									{col === 'tipo_terreno' && row.tipo_terreno
										? row.tipo_terreno.nombre
										: typeof row[col] === 'boolean'
											? row[col]
												? 'Sí'
												: 'No'
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
				<header className="header">
					<h1>
						<span role="img" aria-label="database">
							🌾
						</span>{' '}
						Panel de Tablas de Agricultura
					</h1>
				</header>
				<nav className="tabs">
					{TABLES.map((tab) => (
						<button
							key={tab.key}
							className={`tab-btn${
								activeTab === tab.key ? ' active' : ''
							}`}
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

export default App;

