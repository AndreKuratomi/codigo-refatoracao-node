import express from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import * as yup from "yup";
import bcrypt from "bcryptjs";

const port = 3000;
const config = {
  secret: "the_greatest_secret_key",
  expiresIn: "604800",
};

let app = express();
app.use(express.json());

let companies = [];

const verifyDuplicateCnpj = (req, res, next) => {
  let { cnpj } = req.body;

  let company = companies.find((company) => company.cnpj == cnpj);

  if (company) {
    return res.status(400).json({ message: "CNPJ already registered" });
  }

  return next();
};

const verifyDuplicateVehiclePlate = (req, res, next) => {
  let { plate } = req.body;

  let vehicle = companies.some((company) =>
    company.vehicles.some((vehicle) => vehicle.plate === plate)
  );

  if (vehicle) {
    return res.status(400).json({ message: "Vehicle already registered" });
  }

  return next();
};

const verifyCompanyExistence = (req, res, next) => {
  let { cnpj } = req.params;

  let company = companies.find((company) => company.cnpj == cnpj);

  if (!company) {
    return res.status(400).json({ message: "Company not registered" });
  }

  req.company = company;

  return next();
};

const verifyVehicleExistence = (req, res, next) => {
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

const authenticateCompany = (req, res, next) => {
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

const companySchema = yup.object().shape({
  name: yup
    .string("Formato de nome invalido")
    .required("Campo de name obrigátorio"),
  cnpj: yup
    .string("Formato de cnpj invalido")
    .matches(/^[0-9]{14}$/)
    .required("Campo de cnpj obrigátorio"),
  password: yup
    .string("Formato de senha invalido")
    .required("Campo de senha obrigátorio"),
  cep: yup
    .string("Formato de cep invalido")
    .required("Campo de cep obrigátorio"),
  address: yup
    .string("Formato de endereço invalido")
    .required("Campo de endereço obrigátorio"),
  number: yup
    .number("Formato de número invalido")
    .required("Campo de número obrigátorio")
    .positive("Formato de número invalido")
    .integer("Formato de número invalido"),
  state: yup
    .string("Formato de estado invalido")
    .matches(/^[A-Z]{2}$/)
    .required("Campo de estado obrigátorio"),
  city: yup
    .string("Formato de cidade invalido")
    .required("Campo de cidade obrigátorio"),
});

const vehicleSchema = yup.object().shape({
  model: yup
    .string("Formato de modelo invalido")
    .required("Campo de modelo obrigátorio"),
  brand: yup
    .string("Formato de marca invalida")
    .required("Campo de marca obrigátorio"),
  year: yup
    .number("Formato de ano invalido")
    .required("Campo de ano obrigátorio"),
  plate: yup
    .string("Formato de placa invalido")
    .required("Campo de placa obrigátorio"),
});

const validate = (schema) => async (req, res, next) => {
  const resource = req.body;
  try {
    await schema.validate(resource);
    next();
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.errors.join(", ") });
  }
};

app.post(
  "/companies/register",
  validate(companySchema),
  verifyDuplicateCnpj,
  async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    let company = {
      ...req.body,
      id: uuidv4(),
      vehicles: [],
      password: hashedPassword,
    };

    companies.push(company);

    res.status(201).json({ message: "Company successfully created", company });
  }
);

app.post("/companies/login", async (req, res) => {
  const { cnpj, password } = req.body;

  let company = companies.find((company) => company.cnpj === cnpj);

  const match = await bcrypt.compare(password, company.password);

  if (!company) {
    return res.status(401).json({ message: "Company not found" });
  }
  if (!match) {
    return res.status(401).json({ message: "User and password missmatch." });
  }

  let token = jwt.sign({ cnpj: cnpj }, config.secret, {
    expiresIn: config.expiresIn,
  });

  res.status(200).json({ token, company });
});

app.get("/companies", (req, res) => {
  res.status(200).json(companies);
});

app.put(
  "/companies/:cnpj",
  authenticateCompany,
  verifyCompanyExistence,
  (req, res) => {
    let { company } = req;
    let updatedCompany = { ...company, ...req.body };

    let index = companies.indexOf(company);

    companies[index] = updatedCompany;

    res.status(200).json({ messagem: "Company updated", companies });
  }
);

app.delete(
  "/companies/:cnpj",
  authenticateCompany,
  verifyCompanyExistence,
  (req, res) => {
    let { cnpj } = req.params;

    companies = companies.filter((company) => company.cnpj !== cnpj);

    res.status(200).json({ messagem: "Company deleted", companies });
  }
);

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
    let { vehicle, company } = req;

    let updatedVehicle = { ...vehicle, ...req.body };

    let index = company.vehicles.indexOf(vehicle);

    company.vehicles[index] = updatedVehicle;

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

app.listen(port, () => {
  console.log("App running");
});
