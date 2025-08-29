import { fetchClient } from "./fetchClient";

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
export async function createUser(user: User) {
  return fetchClient<User>("/users", {
    method: "POST",
    body: user,
  });
}

export async function getUsers() {
  return fetchClient<UsersResponse>("/users");
}
