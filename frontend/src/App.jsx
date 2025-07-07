import { useEffect, useState } from 'react';
import './App.css';
import AppRouter from './routes/AppRouter';

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
	return <AppRouter />;
}


export default App;
