import { randomBytes } from "node:crypto";
import { query } from "../../database/query.js";
import type { CreateUserRecord, User } from "./user.types.js";

function createUserId(): string {
  return `c${Date.now().toString(36)}${randomBytes(8).toString("hex")}`;
}

export const userRepository = {
  async create(input: CreateUserRecord): Promise<User> {
    const id = createUserId();
    const rows = await query<User>(
      `
        INSERT INTO "User" (
          id,
          name,
          email,
          password,
          avatar,
          role,
          "createdAt",
          "updatedAt"
        )
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
        RETURNING id, name, email, avatar, role, "createdAt", "updatedAt"
      `,
      [
        id,
        input.name,
        input.email,
        input.password,
        input.avatar ?? null,
        input.role
      ]
    );

    return rows[0] as User;
  },

  async findById(id: string): Promise<User | null> {
    const rows = await query<User>(
      `
        SELECT id, name, email, avatar, role, "createdAt", "updatedAt"
        FROM "User"
        WHERE id = $1
      `,
      [id]
    );

    return rows[0] ?? null;
  },

  async findByEmail(email: string): Promise<User | null> {
    const rows = await query<User>(
      `
        SELECT id, name, email, avatar, role, "createdAt", "updatedAt"
        FROM "User"
        WHERE email = $1
      `,
      [email]
    );

    return rows[0] ?? null;
  },

  findMany(): Promise<User[]> {
    return query<User>(`
      SELECT id, name, email, avatar, role, "createdAt", "updatedAt"
      FROM "User"
      ORDER BY "createdAt" DESC
    `);
  },

  async count(): Promise<number> {
    const rows = await query<{ count: string }>(`
      SELECT COUNT(*) AS count
      FROM "User"
    `);

    return Number(rows[0]?.count ?? 0);
  }
};
