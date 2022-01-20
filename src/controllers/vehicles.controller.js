import { v4 as uuidv4 } from "uuid";

import { extractingForUpdate } from "../services/companies.service";

export const registerCompanyVehicule = async (req, res) => {
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
};

export const listCompanyVehicules = (req, res) => {
  res.status(200).json(req.company.vehicles);
};

export const updateCompanyVehicule = (req, res) => {
  extractingForUpdate(req);

  res.status(200).json({ message: "Vehicle updated", vehicle: updatedVehicle });
};

export const deleteCompanyVehicule = async (req, res) => {
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
