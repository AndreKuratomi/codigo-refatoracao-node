import * as yup from "yup";

export const vehicleSchema = yup.object().shape({
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
