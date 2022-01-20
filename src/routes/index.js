import express from "express";

import { companyRoutes } from "./company.routes";
import { vehiculeRoutes } from "./vehicules.routes";

export const routes = (app) => {
  app.use(express.json());
  companyRoutes(app);
  vehiculeRoutes(app);
};
