import { v4 as uuidv4 } from "uuid";

import app from "../app";
import { vehicleSchema } from "./models/schemas.model";
import {
  verifyCompanyExistence,
  verifyVehicleExistence,
  verifyDuplicateVehiclePlate,
  authenticateCompany,
  validate,
} from "./middlewares/middlewares.middlewares";
import { extractingForUpdate } from "../services/companies.service";

app.post(
  "/companies/:cnpj/vehicles",
  authenticateCompany,
  verifyCompanyExistence,
  verifyDuplicateVehiclePlate,
  validate(vehicleSchema),
  async (req, res) => {
    let newVehicle = {
      ...req.body,
      id: uuidv4(),
      acquisition_date: new Date(),
    };

    let { company } = req;

    company.vehicles.push(newVehicle);

    res.status(201).json({
      message: `Vehicle ${newVehicle.model} from year ${newVehicle.year} was acquired to the ${company.name}'s fleet`,
      vehicle: newVehicle,
    });
  }
);

app.get(
  "/companies/:cnpj/vehicles",
  authenticateCompany,
  verifyCompanyExistence,
  (req, res) => {
    res.status(200).json(req.company.vehicles);
  }
);

app.put(
  "/companies/:cnpj/vehicles/:plate",
  authenticateCompany,
  verifyCompanyExistence,
  verifyVehicleExistence,
  (req, res) => {
    extractingForUpdate(req);

    res
      .status(200)
      .json({ message: "Vehicle updated", vehicle: updatedVehicle });
  }
);

app.delete(
  "/companies/:cnpj/vehicles/:plate",
  authenticateCompany,
  verifyCompanyExistence,
  verifyVehicleExistence,
  async (req, res) => {
    let { plate } = req.params;

    let { company } = req;

    company.vehicles = company.vehicles.filter(
      (vehicle) => vehicle.plate !== plate
    );

    res
      .status(200)
      .json({ messagem: "Vehicle deleted", vehicles: company.vehicles });
  }
);
