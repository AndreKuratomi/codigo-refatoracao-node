import express from "express";

import { companyRoutes } from "./company.routes";
import { vehicleRoutes } from "./vehicles.routes";

export const routes = (app) => {
  app.use(express.json());
  companyRoutes(app);
  vehicleRoutes(app);
};
