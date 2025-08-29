import { fetchClient } from "./fetchClient";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  participationPercentage: number;
};

// Create a new user
export async function createUser(user: User) {
  return fetchClient<User>("/users", {
    method: "POST",
    body: user,
  });
}

// Get all users
export async function getUsers() {
  return fetchClient<User[]>("/users");
}
