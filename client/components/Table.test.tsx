import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { DataTable } from "./Table";

describe("DataTable Component", () => {
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

  it("renders table headers correctly", () => {
    render(<DataTable data={mockData} />);
    const headers = ["S.No", "First name", "Last name", "Participation"];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it("renders all rows correctly", () => {
    render(<DataTable data={mockData} />);
    mockData.forEach((row, index) => {
      expect(screen.getByText((index + 1).toString())).toBeInTheDocument();
      expect(screen.getByText(row.firstName)).toBeInTheDocument();
      expect(screen.getByText(row.lastName)).toBeInTheDocument();
      expect(
        screen.getByText(`${row.participationPercentage}%`)
      ).toBeInTheDocument();
    });
  });

  it("renders empty state when no data is passed", () => {
    render(<DataTable data={[]} />);
    expect(screen.getByText(/No records available/i)).toBeInTheDocument();
  });
});
