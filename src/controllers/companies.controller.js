import app from "../app";
import { companies } from "../config/config";
import { companySchema } from "./models/schemas.model";
import {
  verifyCompanyExistence,
  verifyDuplicateCnpj,
  authenticateCompany,
  validate,
} from "./middlewares/middlewares.middlewares";
import {
  checkingForLogin,
  extractingForDelete,
  extractingForUpdate,
  hashing,
} from "../services/companies.service";

app.post(
  "/companies/register",
  validate(companySchema),
  verifyDuplicateCnpj,
  async (req, res) => {
    hashing(req);

    companies.push(company);

    res.status(201).json({ message: "Company successfully created", company });
  }
);

app.post("/companies/login", async (req, res) => {
  checkingForLogin(req);

  let company = companies.find((company) => company.cnpj === cnpj);

  if (!company) {
    return res.status(401).json({ message: "Company not found" });
  }

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
    extractingForUpdate(req);

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
    extractingForDelete(req);

    companies = companies.filter((company) => company.cnpj !== cnpj);

    res.status(200).json({ messagem: "Company deleted", companies });
  }
);
