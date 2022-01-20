import jwt from "jsonwebtoken";
import { companies, config } from "../services/services.service";

export const verifyDuplicateCnpj = (req, res, next) => {
  let { cnpj } = req.body;

  let company = companies.find((company) => company.cnpj == cnpj);

  if (company) {
    return res.status(400).json({ message: "CNPJ already registered" });
  }

  return next();
};

export const verifyDuplicateVehiclePlate = (req, res, next) => {
  let { plate } = req.body;

  let vehicle = companies.some((company) =>
    company.vehicles.some((vehicle) => vehicle.plate === plate)
  );

  if (vehicle) {
    return res.status(400).json({ message: "Vehicle already registered" });
  }

  return next();
};

export const verifyCompanyExistence = (req, res, next) => {
  let { cnpj } = req.params;

  let company = companies.find((company) => company.cnpj == cnpj);

  if (!company) {
    return res.status(400).json({ message: "Company not registered" });
  }

  req.company = company;

  return next();
};

export const verifyVehicleExistence = (req, res, next) => {
  let { plate } = req.params;

  let vehicle = companies.some((company) =>
    company.vehicles.some((vehicle) => vehicle.plate === plate)
  );

  if (!vehicle) {
    return res.status(400).json({ message: "Vehicle not registered" });
  }

  req.vehicle = vehicle;

  return next();
};

export const authenticateCompany = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Missing authorization" });
  }

  let token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Invalid Token." });
    } else {
      return next();
    }
  });
};

export const validate = (schema) => async (req, res, next) => {
  const resource = req.body;
  try {
    await schema.validate(resource);
    next();
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.errors.join(", ") });
  }
};
