import { Router } from "express";

import { companySchema } from "./models/schemas.model";
import {
  verifyCompanyExistence,
  verifyDuplicateCnpj,
  authenticateCompany,
  validate,
} from "./middlewares/middlewares.middlewares";
import {
  registerCompany,
  loginCompany,
  listCompanies,
  updateCompany,
  deleteCompany,
} from "../controllers/companies.controller";

const route = Router();

export const companyRoutes = (app) => {
  route.post(
    "/register",
    validate(companySchema),
    verifyDuplicateCnpj,
    registerCompany
  );
  route.post("/login", loginCompany);
  route.get("", listCompanies);
  route.put(
    "/:cnpj",
    authenticateCompany,
    verifyCompanyExistence,
    updateCompany
  );
  route.delete(
    "/:cnpj",
    authenticateCompany,
    verifyCompanyExistence,
    deleteCompany
  );

  app.use("/companies", route);
};
