import app from "../app";
import { companies } from "../config/config";

import {
  checkingForLogin,
  extractingForDelete,
  extractingForUpdate,
  hashing,
} from "../services/companies.service";

export const registerCompany = (req, res) => {
  hashing(req);

  companies.push(company);

  res.status(201).json({ message: "Company successfully created", company });
};

export const loginCompany = (req, res) => {
  checkingForLogin(req);

  let company = companies.find((company) => company.cnpj === cnpj);

  if (!company) {
    return res.status(401).json({ message: "Company not found" });
  }

  res.status(200).json({ token, company });
};

export const listCompanies = (req, res) => {
  res.status(200).json(companies);
};

export const updateCompany = (req, res) => {
  extractingForUpdate(req);

  let index = companies.indexOf(company);

  companies[index] = updatedCompany;

  res.status(200).json({ messagem: "Company updated", companies });
};

export const deleteCompany = (req, res) => {
  extractingForDelete(req);

  companies = companies.filter((company) => company.cnpj !== cnpj);

  res.status(200).json({ messagem: "Company deleted", companies });
};
