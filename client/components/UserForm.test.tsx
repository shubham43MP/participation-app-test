import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserForm } from "./UserForm";
import { userApi } from "@/services/";
import { useRouter } from "next/navigation";

jest.mock("@/services/", () => ({
  userApi: {
    createUser: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("UserForm Component", () => {
  const mockRefresh = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ refresh: mockRefresh });
    jest.clearAllMocks();
  });

  it("renders all input fields and button", () => {
    render(<UserForm />);

    expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Participation")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("submits form with correct values", async () => {
    render(<UserForm />);

    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Participation"), {
      target: { value: "50" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(userApi.createUser).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        participationPercentage: 50,
      });
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("shows validation errors when fields are empty", async () => {
    render(<UserForm />);

    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText("First name is required")).toBeInTheDocument();
      expect(screen.getByText("Last name is required")).toBeInTheDocument();
      expect(screen.getByText("Participation is required")).toBeInTheDocument();
    });

    expect(userApi.createUser).not.toHaveBeenCalled();
  });

  it("disables submit button while submitting", async () => {
    (userApi.createUser as jest.Mock).mockImplementation(
      () => new Promise((res) => setTimeout(res, 100))
    );

    render(<UserForm />);

    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Participation"), {
      target: { value: "50" },
    });

    const button = screen.getByRole("button", { name: /send/i });
    fireEvent.click(button);

    expect(button).toBeDisabled();

    await waitFor(() => expect(userApi.createUser).toHaveBeenCalled());
  });
});
