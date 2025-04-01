import request from "supertest";
import { pool } from "../database/connect.database";
import bcrypt from "bcrypt";
import { createToken } from "../utils/util";
import createServer from "../utils/server";

jest.mock("../database/connect.database");
jest.mock("../utils/util");
jest.mock("bcrypt");
const app = createServer();

// test for user login
describe("test create route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should have key record and msg when created", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          user_id: 1,
          username: "testuser",
          email: "test@example.com",
          role: "user",
          password: "hashedpassword",
        },
      ],
    });
    bcrypt.compare.mockResolvedValue(true);
    createToken.mockResolvedValue("token");

    const res = await request(app).post("/auth/login")
    .send({
      email: "test@example.com",
      password: "password123",
        });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Logged in successfully");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("username", "testuser");
    expect(res.body.user).toHaveProperty("role");
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });

  test("Should return error for invalid credentials", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          user_id: 1,
          username: "testuser",
          email: "test@example.com",
          role: "user",
          password: "hashedpassword",
        },
      ],
    });
    bcrypt.compare.mockResolvedValue(false);
    createToken.mockResolvedValue("token");
    const res = await request(app).post("/auth/login").send({
      email: "wrong@test.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });

  test("should return error for invalid password", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          user_id: 1,
          username: "testuser",
          role: "user",
          password: "hashedpassword",
        },
      ],
    });
    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });

  test("should return error if database query fails", async () => {
    pool.query.mockRejectedValueOnce(new Error("query failed"));

    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Failed to login user");
  });
});

// test case for registerUser

describe("User Registration API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should successfully register a user", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({
      rows: [{ username: "testuser", role: "user" }],
    });

    bcrypt.hash.mockResolvedValue("hashedpassword");
    createToken.mockResolvedValue("token");

    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "User created successfully");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("username", "testuser");
    expect(res.body.user).toHaveProperty("role", "user");
    expect(res.body).toHaveProperty("token", "token");
  });

  test("should return error if fields are missing", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "test@example.com",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Please provide all the fields");
  });

  test("should return error if user already exists", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ email: "test@example.com" }] });

    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "user already exists");
  });

  test("should return error if database query fails", async () => {
    pool.query.mockRejectedValueOnce(new Error("Query failed"));

    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Failed to register user");
  });
});
