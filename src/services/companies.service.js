export let companies = [];

export const config = {
  secret: "the_greatest_secret_key",
  expiresIn: "604800",
};

import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const hashing = (req) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let company = {
    ...req.body,
    id: uuidv4(),
    vehicles: [],
    password: hashedPassword,
  };

  return company;
};

export const checkingForLogin = (req) => {
  const { cnpj, password } = req.body;

  const match = await bcrypt.compare(password, company.password);

  if (!match) {
    return res.status(401).json({ message: "User and password missmatch." });
  }

  let token = jwt.sign({ cnpj: cnpj }, config.secret, {
    expiresIn: config.expiresIn,
  });

  return token;
};

export const extractingForUpdate = (req) => {
  let { company } = req;
  let updatedCompany = { ...company, ...req.body };

  return updatedCompany;
};
