import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardChart({ labels, dataSet, color, title, label }) {
  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: dataSet,
        borderColor: color,
        backgroundColor: color + "88",
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", padding: 24, margin: "32px 0" }}>
      <Line data={data} options={options} />
    </div>
  );
} 