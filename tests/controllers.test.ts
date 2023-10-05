// __tests__/UserController.test.ts
import { Request, Response } from "express";
import { createUser, getUsers } from "../src/controllers/UserController";

jest.mock("express");

describe("UserController", () => {
  it("should create a user", async () => {
    const req = {
      body: { name: "John", email: "john@example.com", password: "password" },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createUser(req, res);

    expect((res as Response).status).toHaveBeenCalledWith(201);
    expect((res as Response).json).toHaveBeenCalledWith(
      expect.objectContaining({ name: "John", email: "john@example.com" })
    );
  });

  it("should get all users", async () => {
    const req = {} as Request;
    const res = { json: jest.fn() } as unknown as Response;

    await getUsers(req, res);

    expect((res as Response).json).toHaveBeenCalled();
  });
});
