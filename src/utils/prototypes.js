export const company1 = {
  name: "André SA",
  cnpj: "00000000000000",
  password: "1234",
  cep: "00000000",
  address: "Rua X",
  number: 123,
  state: "MG",
  city: "Araxá",
};

export const company2 = {
  name: "André LTDA",
  cnpj: "11111111111111",
  password: "1234",
  cep: "11111111",
  address: "Rua Y",
  number: 321,
  state: "PI",
  city: "Pedro II",
};

export const wrongCompany1 = {
  name: "André SA",
  cnpj: "00000000000000",
  password: "1234",
  cep: "00000000",
  address: "Rua X",
  number: -123,
  state: "MG",
  city: "Araxá",
};

export const wrongCompany2 = {
  name: "André LTDA",
  cnpj: "4321",
  password: "1234",
  cep: "11111111",
  address: "Rua Y",
  number: 321,
  state: "PI",
  city: "Pedro II",
};

export const companyResponse1 = {
  ...company1,
  id: "uuid",
  vehicles: [],
  password: "1234",
};

export const companyResponse2 = {
  ...company2,
  id: "uuid",
  vehicles: [],
  password: "1234",
};

export const dataForLogin = {
  cnpj: "00000000000000",
  password: "1234",
};

export const vehicle = {
  model: "Celta",
  brand: "Ford",
  year: 2020,
  plate: "RNA-0000",
};
