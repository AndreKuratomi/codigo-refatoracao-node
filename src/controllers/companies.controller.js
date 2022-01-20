import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import app from "../app";
import { companies, config } from "./services/services.service";
import { companySchema } from "./models/schemas.model";
import {
  verifyCompanyExistence,
  verifyDuplicateCnpj,
  authenticateCompany,
  validate,
} from "./middlewares/middlewares.middlewares";

app.post(
  "/companies/register",
  validate(companySchema),
  verifyDuplicateCnpj,
  async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let company = {
      ...req.body,
      id: uuidv4(),
      vehicles: [],
      password: hashedPassword,
    };

    companies.push(company);

    res.status(201).json({ message: "Company successfully created", company });
  }
);

app.post("/companies/login", async (req, res) => {
  const { cnpj, password } = req.body;

  let company = companies.find((company) => company.cnpj === cnpj);

  const match = await bcrypt.compare(password, company.password);

  if (!company) {
    return res.status(401).json({ message: "Company not found" });
  }
  if (!match) {
    return res.status(401).json({ message: "User and password missmatch." });
  }

  let token = jwt.sign({ cnpj: cnpj }, config.secret, {
    expiresIn: config.expiresIn,
  });

  res.status(200).json({ token, company });
});

app.get("/companies", (req, res) => {
  res.status(200).json(companies);
});

app.put(
  "/companies/:cnpj",
  authenticateCompany,
  verifyCompanyExistence,
  (req, res) => {
    let { company } = req;
    let updatedCompany = { ...company, ...req.body };

    let index = companies.indexOf(company);

    companies[index] = updatedCompany;

    res.status(200).json({ messagem: "Company updated", companies });
  }
);

app.delete(
  "/companies/:cnpj",
  authenticateCompany,
  verifyCompanyExistence,
  (req, res) => {
    let { cnpj } = req.params;

    companies = companies.filter((company) => company.cnpj !== cnpj);

    res.status(200).json({ messagem: "Company deleted", companies });
  }
);
