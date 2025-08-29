import { apiClient } from "./apiClient";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  participationPercentage: number;
  createdAt: string;
};

export type UsersResponse = {
  success: boolean;
  data: User[];
};

type CreateUserPayload = Omit<User, "id" | "createdAt">;

export const userApi = {
  createUser: (user: CreateUserPayload) => {
    return apiClient<UsersResponse>("/users", {
      method: "POST",
      body: user,
    });
  },
  getUsers: () => {
    return apiClient<UsersResponse>("/users");
  },
};
