import React from 'react';
import '../style/Tables.css';

export default function Tabla({ columns, data }) {
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
