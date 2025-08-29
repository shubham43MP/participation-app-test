"use client";

import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  participationPercentage: number;
};

type PieChartProps = {
  data: User[];
};
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const labels = data.map((item) => `${item.firstName} ${item.lastName}`);
  const participationValues = data.map((item) =>
    parseInt(item.participationPercentage.toString())
  );

  const backgroundColors = [
    "#3182CE",
    "#059669",
    "#7C3AED",
    "#94A3B8",
    "#EF4444",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: participationValues,
        backgroundColor: backgroundColors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          boxWidth: 24,
          boxHeight: 24,
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
        bodyFont: {
          family: "'Helvetica Neue', 'Arial', sans-serif",
          size: 14,
          weight: "normal",
          style: "normal",
        },
        bodyAlign: "center",
      },
    },
  };

  return (
    <div className="relative w-full h-96 max-w-lg mx-auto">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
