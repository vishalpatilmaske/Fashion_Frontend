// SellChart.js
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

const SellChart = ({ monthlySales }) => {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Sales in ₹",
        data: monthlySales,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: true,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Product Sales Over 12 Months (INR)",
        font: { size: 18, family: "Arial", weight: "bold" },
        color: "#333",
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 10,
        callbacks: {
          label: function (context) {
            return `₹${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { display: false },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `₹${value}`;
          },
        },
      },
    },
  };

  return (
    <div
      className="chart-container card shadow-sm p-4 mb-5 bg-body rounded"
      style={{
        width: "100%",
        maxWidth: "68%",
        margin: "0 auto",
        height: "400px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default SellChart;
