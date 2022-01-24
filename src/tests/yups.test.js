import request from "supertest";
import app from "../app";

import { wrongCompany1, wrongCompany2 } from "../utils/prototypes";

describe("Yup tests", () => {
  test("Is number positive?", async () => {
    const response = await request(app)
      .post("/companies/register")
      .send(wrongCompany1)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Formato de número invalido",
    });
  });

  test("Is cnpj well written?", async () => {
    const response = await request(app)
      .post("/companies/register")
      .send(wrongCompany2)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: 'cnpj must match the following: "/^[0-9]{14}$/"',
    });
  });
});
