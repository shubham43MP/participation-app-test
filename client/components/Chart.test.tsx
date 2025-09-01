import { render, screen } from "@testing-library/react";
import { DoughnutChart } from "./Chart";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("react-chartjs-2", () => ({
  Doughnut: ({ data, options }: any) => (
    <div data-testid="mock-doughnut-chart">
      <pre data-testid="chart-data">{JSON.stringify(data)}</pre>
      <pre data-testid="chart-options">{JSON.stringify(options)}</pre>
    </div>
  ),
}));

describe("DoughnutChart component", () => {
  const mockData = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      participationPercentage: 40,
      createdAt: "2023-10-01T00:00:00Z",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      participationPercentage: 60,
      createdAt: "2023-10-02T00:00:00Z",
    },
  ];

  it("renders chart container", () => {
    render(<DoughnutChart data={mockData} />);
    expect(screen.getByTestId("mock-doughnut-chart")).toBeInTheDocument();
  });

  it("passes correct labels and data", () => {
    render(<DoughnutChart data={mockData} />);
    const chartData = JSON.parse(screen.getByTestId("chart-data").textContent!);
    expect(chartData.labels).toEqual(["John Doe", "Jane Smith"]);
    expect(chartData.datasets[0].data).toEqual([40, 60]);
  });

  it("applies chart options", () => {
    render(<DoughnutChart data={mockData} />);
    const chartOptions = JSON.parse(
      screen.getByTestId("chart-options").textContent!
    );
    expect(chartOptions.plugins.legend.position).toBe("right");
  });
});
