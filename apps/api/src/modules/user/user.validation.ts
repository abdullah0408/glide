import type { CreateUserInput } from "./user.types.js";

type CreateUserValidationResult =
  | {
      success: true;
      data: CreateUserInput;
    }
  | {
      success: false;
      error: string;
    };

export function validateCreateUser(body: unknown): CreateUserValidationResult {
  const data = body as Partial<CreateUserInput>;

  if (!data.name || data.name.trim().length === 0) {
    return { success: false, error: "name is required" };
  }

  if (!data.email || data.email.trim().length === 0) {
    return { success: false, error: "email is required" };
  }

  if (!data.email.includes("@")) {
    return { success: false, error: "email must be valid" };
  }

  if (!data.password || data.password.trim().length === 0) {
    return { success: false, error: "password is required" };
  }

  const input: CreateUserInput = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    password: data.password
  };

  const avatar = data.avatar?.trim();

  if (avatar) {
    input.avatar = avatar;
  }

  return {
    success: true,
    data: input
  };
}
