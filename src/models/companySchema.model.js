import * as yup from "yup";

export const companySchema = yup.object().shape({
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
