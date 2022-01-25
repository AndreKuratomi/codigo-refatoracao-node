import { Router } from "express";

import { companySchema } from "../models/companySchema.model";
import {
  verifyCompanyExistence,
  verifyDuplicateCnpj,
  authenticateCompany,
  validate,
} from "../middlewares/middlewares.middlewares";
import {
  registerCompany,
  loginCompany,
  listCompanies,
  updateCompany,
  deleteCompany,
} from "../controllers/companies.controller";

const route = Router();

export const companyRoutes = (app) => {
  route.use("/:cnpj(\\d+)", authenticateCompany, verifyCompanyExistence);

  route.post(
    "/register",
    validate(companySchema),
    verifyDuplicateCnpj,
    registerCompany
  );
  route.post("/login", loginCompany);
  route.get("", listCompanies);
  route.put("/:cnpj", updateCompany);
  route.delete("/:cnpj", deleteCompany);

  app.use("/companies", route);
};
