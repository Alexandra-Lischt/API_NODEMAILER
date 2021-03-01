import request from "supertest";
import { app } from "../app";
import createConnection from "../database";
import { getConnection } from "typeorm";

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

  const survey = {
    title: "title example",
    description: "description example"
  }

  it("should be able to create new survey", async () => {
    const response = await server.post("/surveys").send(survey)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
  })

  it("should be able to fetch all surveys", async () => {
    await server.post("/surveys").send(survey)

    const response = await server.get("/surveys");

    expect(response.body.length).toBe(2);
  })
})