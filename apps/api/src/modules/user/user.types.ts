export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

export type CreateUserRecord = CreateUserInput & {
  role: string;
};
