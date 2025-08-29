"use client";

import { User } from "@/services/userApi";
import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

type PieChartProps = {
  data: User[];
};

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
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
    "#F59E0B",
    "#10B981",
    "#8B5CF6",
    "#E11D48",
    "#3B82F6",
  ];

  const hoverBackgroundColors = backgroundColors.map((color) => color + "CC");

  const chartData = {
    labels,
    datasets: [
      {
        data: participationValues,
        backgroundColor: backgroundColors,
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 5,
        hoverBorderColor: "#000",
        hoverBorderWidth: 2,
        hoverBackgroundColor: hoverBackgroundColors,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
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
        onHover: (event) => {
          (event.native?.target as HTMLCanvasElement).style.cursor = "pointer";
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
    animation: {
      animateRotate: true,
      animateScale: true,
      easing: "easeOutBounce",
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    onHover: (event, chartElement) => {
      const target = event.native?.target as HTMLCanvasElement;
      target.style.cursor = chartElement.length ? "pointer" : "default";
    },
  };

  return (
    <div className="relative w-full h-96 max-w-lg mx-auto">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
