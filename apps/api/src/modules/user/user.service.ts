import { userRepository } from "./user.repository.js";
import type { CreateUserInput } from "./user.types.js";

export const userService = {
  async createUser(input: CreateUserInput) {
    const existingUser = await userRepository.findByEmail(input.email);

    if (existingUser) {
      return null;
    }

    const userCount = await userRepository.count();

    return userRepository.create({
      ...input,
      role: userCount === 0 ? "admin" : "user"
    });
  },

  getUserById(id: string) {
    return userRepository.findById(id);
  },

  getUsers() {
    return userRepository.findMany();
  }
};
