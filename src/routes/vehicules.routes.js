import Router from "express";

import { vehicleSchema } from "../models/schemas.model";
import {
  verifyCompanyExistence,
  verifyVehicleExistence,
  verifyDuplicateVehiclePlate,
  authenticateCompany,
  validate,
} from "../middlewares/middlewares.middlewares";
import {
  registerCompanyVehicule,
  listCompanyVehicules,
  updateCompanyVehicule,
  deleteCompanyVehicule,
} from "../controllers/vehicles.controller";

const route = Router();

export const vehiculeRoutes = (app) => {
  route.post(
    "/:cnpj/vehicles",
    authenticateCompany,
    verifyCompanyExistence,
    verifyDuplicateVehiclePlate,
    validate(vehicleSchema),
    registerCompanyVehicule
  );
  route.get(
    "/:cnpj/vehicles",
    authenticateCompany,
    verifyCompanyExistence,
    listCompanyVehicules
  );
  route.put(
    "/:cnpj/vehicles/:plate",
    authenticateCompany,
    verifyCompanyExistence,
    verifyVehicleExistence,
    updateCompanyVehicule
  );
  route.delete(
    "/:cnpj/vehicles/:plate",
    authenticateCompany,
    verifyCompanyExistence,
    verifyVehicleExistence,
    deleteCompanyVehicule
  );

  app.use("/companies", route);
};
