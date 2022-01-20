import app from "../app";
import { companies, config } from "../config/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import {
  checkingForLogin,
  extractingForDelete,
  extractingForUpdate,
  hashing,
} from "../services/companies.service";

export const registerCompany = async (req, res) => {
  const company = await hashing(req);

  companies.push(company);

  res.status(201).json({ message: "Company successfully created", company });
};

export const loginCompany = async (req, res) => {
  // services não funcina aqui
  const { cnpj, password } = req.body;

  let company = companies.find((company) => company.cnpj === cnpj);

  if (!company) {
    return res.status(401).json({ message: "Company not found" });
  }

  const match = await bcrypt.compare(password, company.password);

  if (!match) {
    return res.status(401).json({ message: "User and password missmatch." });
  }

  let token = jwt.sign({ cnpj: cnpj }, config.secret, {
    expiresIn: config.expiresIn,
  });

  res.status(200).json({ token, company });
};

export const listCompanies = (req, res) => {
  res.status(200).json(companies);
};

export const updateCompany = (req, res) => {
  // services não funcina aqui
  let { company } = req;
  let updatedCompany = { ...company, ...req.body };

  let index = companies.indexOf(company);

  companies[index] = updatedCompany;

  res.status(200).json({ messagem: "Company updated", companies });
};

export const deleteCompany = (req, res) => {
  let { cnpj } = req.params;

  companies = companies.filter((company) => company.cnpj !== cnpj);

  res.status(200).json({ messagem: "Company deleted", companies });
};
