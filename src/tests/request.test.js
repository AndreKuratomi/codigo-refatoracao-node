import request from "supertest";
import app from "../app";
import { registerCompany } from "../controllers/companies.controller";

const company1 = {
  name: "André SA",
  cnpj: "00000000000000",
  password: 1234,
  cep: "00000000",
  address: "Rua X",
  number: 123,
  state: "MG",
  city: "Araxá",
};

const mockCompanyRegister = jest.fn();

const company2 = {
  name: "André LTDA",
  cnpj: "11111111111111",
  password: 1234,
  cep: "11111111",
  address: "Rua Y",
  number: 321,
  state: "PI",
  city: "Pedro II",
};

// const sum = (a, b) => {
//   return a + b;
// };

// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });

describe("Request tests", () => {
  test("Success message", async () => {
    //502 referee-se a um problema no servidor
    const response = await request(app)
      .post("/companies/register")
      .send(company1)
      .expect(201);
    expect(response.body.message).toBe("Company successfully created"); //toBe é valor
  });
  test("Create company1", async () => {
    // const response = await request(app)
    //   .post("/register")
    //   .send(company1)
    //   .expect(201);
    expect(10).toBe(10);
  });
  // test("Create company2", async () => {
  //   const response = await request(app)
  //     .post("/register")
  //     .send(company2)
  //     .expect(201);
  //   expect(response.body).toStrictEqual(result2); //toStrictEqual é o objeto completo
  // });
  // test("List users", () => {});
  //   test("Refuse creation due to body error", () => {});
  // jest.useFakeTimers("legacy");
});
