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
    "/:cnpj(\\d+)/vehicles",
    authenticateCompany,
    verifyCompanyExistence
  );
  route.use("/:cnpj(\\d+)/vehicles/:plate", verifyVehicleExistence);

  route.post(
    "/:cnpj(\\d+)/vehicles",
    verifyDuplicateVehiclePlate,
    validate(vehicleSchema),
    registerCompanyVehicule
  );
  route.get("/:cnpj(\\d+)/vehicles", listCompanyVehicules);
  route.put("/:cnpj(\\d+)/vehicles/:plate", updateCompanyVehicule);
  route.delete("/:cnpj(\\d+)/vehicles/:plate", deleteCompanyVehicule);

  app.use("/companies", route);
};
