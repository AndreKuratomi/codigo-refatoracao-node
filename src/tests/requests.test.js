import request from "supertest";
import app from "../app";
import bcrypt from "bcryptjs";

jest.mock("uuid", () => ({ v4: () => "uuid" }));

const spyCompare = jest.spyOn(bcrypt, "hashSync");
spyCompare.mockReturnValue("1234");

const company1 = {
  name: "André SA",
  cnpj: "00000000000000",
  password: "1234",
  cep: "00000000",
  address: "Rua X",
  number: 123,
  state: "MG",
  city: "Araxá",
};
console.log(company1.password);

const company2 = {
  name: "André LTDA",
  cnpj: "11111111111111",
  password: "1234",
  cep: "11111111",
  address: "Rua Y",
  number: 321,
  state: "PI",
  city: "Pedro II",
};

describe("Request tests", () => {
  test("Success message", async () => {
    const response = await request(app)
      .post("/companies/register")
      .send(company1)
      .expect(201);
    expect(response.body.message).toBe("Company successfully created");
  });

  test("Create company1", async () => {
    const response = await request(app)
      .post("/companies/register")
      .send(company1)
      .expect(201);
    expect(response.body.company.name).toBe("André SA"); //???? por alguma razão não passa da linha 46 por "400 "Bad Request""
  });

  test("Create company2", async () => {
    const response = await request(app)
      .post("/companies/register")
      .send(company2)
      .expect(201);
    expect(response.body.company.password).toBe("1234"); // não estou entendendo como o spyOn influencia aqui.
    // expect(spyCompare).toBe(spyCompare.mockReturnValue("1234")); //toStrictEqual é o objeto completo
  });

  test("List users", async () => {
    const response = await request(app).get("/companies").expect(200);
    expect(response.body).toStrictEqual([company1, company2]);

    // ok, como produzir esse response completo ???
  });
});
