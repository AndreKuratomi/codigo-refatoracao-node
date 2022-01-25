import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export const hashing = async (req) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let company = {
    ...req.body,
    id: uuidv4(),
    vehicles: [],
    password: hashedPassword,
  };

  return company;
};
