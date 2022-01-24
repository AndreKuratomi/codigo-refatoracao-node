import request from "supertest";
import app from "../app";

import { company1, dataForLogin, vehicle } from "../utils/prototypes";

describe("Middleware tests", () => {
  test("Check first CNJP", async () => {
    const response = await request(app)
      .post("/companies/register")
      .send(company1)
      .expect(201);
    expect(response.body.company.cnpj).toBe("00000000000000");
  });

  test("Repeated CNJP", async () => {
    const response = await request(app)
      .post("/companies/register")
      .send(company1)
      .expect(400);
    expect(response.body).toStrictEqual({
      message: "CNPJ already registered",
    });
  });

  test("Create vehicle with company1", async () => {
    const login = await request(app)
      .post("/companies/login")
      .send(dataForLogin)
      .expect(200);
    const token = login.body.token;

    const response = await request(app)
      .post("/companies/00000000000000/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicle)
      .expect(201);
    expect(response.body.message).toBe(
      "Vehicle Celta from year 2020 was acquired to the André SA's fleet"
    );
  });

  test("Create repeated vehicle with company1", async () => {
    const login = await request(app)
      .post("/companies/login")
      .send(dataForLogin)
      .expect(200);
    const token = login.body.token;

    const response = await request(app)
      .post("/companies/00000000000000/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicle)
      .expect(400);
    expect(response.body).toStrictEqual({
      message: "Vehicle already registered",
    });
  });
});
