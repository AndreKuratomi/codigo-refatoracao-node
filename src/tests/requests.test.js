import request from "supertest";
import app from "../app";
import bcrypt from "bcryptjs";

import {
  company1,
  company2,
  companyResponse1,
  companyResponse2,
  dataForLogin,
  vehicle,
} from "../utils/prototypes";

jest.mock("uuid", () => ({ v4: () => "uuid" }));

const spyCompare = jest.spyOn(bcrypt, "hash");
spyCompare.mockReturnValue("1234");

describe("Request tests for companies", () => {
  test("Success message", async () => {
    const response = await request(app)
      .post("/companies/register")
      .send(company1)
      .expect(201);
    expect(response.body.message).toBe("Company successfully created");
  });

  test("Create company2", async () => {
    const response = await request(app)
      .post("/companies/register")
      .send(company2)
      .expect(201);
    expect(response.body.company.password).toBe("1234");
  });

  test("List users", async () => {
    const response = await request(app).get("/companies").expect(200);
    expect(response.body).toStrictEqual([companyResponse1, companyResponse2]);
  });
});
