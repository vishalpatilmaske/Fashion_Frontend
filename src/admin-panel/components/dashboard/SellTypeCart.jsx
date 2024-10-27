// ProductTypePieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const SellTypeChart = ({ menSales, womenSales }) => {
  // Data for Pie chart
  const data = {
    labels: ["Men", "Women"],
    datasets: [
      {
        label: "Sales Distribution",
        data: [menSales, womenSales],
        backgroundColor: ["rgba(54, 162, 235, 0.7)", "rgba(255, 99, 132, 0.7)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Sales Distribution by Product Type (Men vs. Women)",
        font: { size: 13, weight: "bold" },
        color: "#333",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
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
        maxWidth: "28%",
        margin: "0 auto",
        height: "400px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Pie data={data} options={options} />
    </div>
  );
};

export default SellTypeChart;
