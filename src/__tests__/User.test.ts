import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";
import createConnection from "../database";


describe("should return all users", () => {
  const server = request(app);

  beforeAll(async () =>  {
    const connection = await createConnection();
    await connection.runMigrations();
  })

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  const user = {
    name: "user2",
    email: "user2@teste.com"
  }

  it("should be able to create new user", async () => {
    const response = await server.post("/users").send(user)

    expect(response.status).toBe(201)
  })

  it("should not be able to create user with existing email", async () => {
    const response = await server.post("/users").send(user)

    expect(response.status).toBe(400)
  })
})