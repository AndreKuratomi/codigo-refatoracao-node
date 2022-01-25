import Router from "express";

import { vehicleSchema } from "../models/vehicleSchema.model";
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

export const vehicleRoutes = (app) => {
  route.use(
    "/:cnpj(\\+d)/vehicles/:plate(\\+d)",
    authenticateCompany,
    verifyCompanyExistence,
    verifyVehicleExistence
  );

  route.post(
    "/:cnpj/vehicles",
    verifyDuplicateVehiclePlate,
    validate(vehicleSchema),
    registerCompanyVehicule
  );
  route.get("/:cnpj/vehicles", listCompanyVehicules);
  route.put("/:cnpj/vehicles/:plate", updateCompanyVehicule);
  route.delete("/:cnpj/vehicles/:plate", deleteCompanyVehicule);

  route.use("/:cnpj/vehicles", authenticateCompany, verifyCompanyExistence);

  app.use("/companies", route);
};
