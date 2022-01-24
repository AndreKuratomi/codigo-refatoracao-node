## REFATORAÇÃO CÓDIGO FONTE

- [Descrição](#descrição)
- [Instalação](#instalação)
- [Utilização](#utilização)
- [Termos de uso](#termos-de-uso)
- [Referências](#referências)

<br>

# Descrição

<p>A aplicação <b>Refatoração código fonte</b> consiste, como o próprio nome diz, numa refatoração da aplicação do desenvolvedor Alan Cesar Pires (original <b>[aqui](https://gitlab.com/kenzie-academy-brasil/se/back-end-web-development/q4/codigo-refatoracao-node-sprint-4b)</b>) na qual também foi acrescentado o gerenciamento de rotas e a aplicação de testes em Jest.</p>

<p>A aplicação em si é um serviço simples de gerenciamento de empresas e seus respectivos veículos. Esta aplicação utiliza o ambiente de execução Node.js e o framework Express.js.</p>
<br>

# Instalação

<h5>0. Primeiramente, é necessário já ter instalado na própria máquina:</h5>

- <p> Um <b>editor de código</b>, conhecido também como <b>IDE</b>. Por exemplo, o <b>[Visual Studio Code (VSCode)](https://code.visualstudio.com/)</b>.</p>

- <p> Uma <b>ferramenta cliente de API REST</b>. Por exemplo, o <b>[Insomnia](https://insomnia.rest/download)</b> ou o <b>[Postman](https://www.postman.com/product/rest-client/)</b>.</p>

- <p> E versionar o diretório para receber o clone da aplicação:</p>

```
git init
```

<br>
<h5>1. Fazer o clone do reposítório <span style="text-decoration: underline">Users service</span> na sua máquina pelo terminal do computador ou pelo do IDE:</h5>

```
git clone git@gitlab.com:ABKURA/codigo-refatoracao-node-sprint-4b.git
```

<p>Entrar na pasta criada:</p>

```
cd codigo-refatoracao-node-sprint-4b
```

<p>Instalar as dependências:</p>

```
yarn
```

<p><b>Obs:</b> caso não tenha o gerenciador de pacotes <b>yarn</b> instalar desta maneira:</p>

```
npm install --global yarn
```

<p>E rodar a aplicação:</p>

```
code .
```

<br>

<h5>2. Feitas as instalações precisamos criar nosso arquivo de variáveis de ambiente, o <span style="text-decoration: underline">.env</span>:</h5>

```
touch .env
```

Dentro dele precisamos definir nossas duas variáveis de ambiente:

```
JWT_SECRET_KEY=chave_aleatória_secreta
JWT_EXPIRES_IN=tempo_de_vida_do_JWT (exemplos: 1000, "2 dias", "10h", "7d")
```

<b>Obs:</b> as informações contidas no arquivo <b>.env</b> não devem ser compartilhadas. O arquivo já consta no <b>.gitignore</b> para não ser subido no repositório.

# Utilização

<p>Antes de passarmos para o API Client precisamos rodar o CLI</p>

```
yarn dev
```

<p>A aplicação rodará com o <b>localhost:3000</b>. Adicionar depois deste as rotas e suas terminações, ou <b>endpoints</b>, que veremos a seguir.</p>

<p>Após o CLI rodar de modo bem sucedido com o API Client aberto vamos utilizar as seguintes rotas:</p>

<h3>Rotas Companies</h3>

<h4>Cadastro</h4>

Cadastro de usuários (Método POST): <b>/companies/register</b> (ou localhost:3000/companies/register)

Exemplo a ser colocado no body da requisição:

```
{
  "name": "Empresa LTDA",
  "cnpj": "11111111111111",
  "password": "1234",
  "cep": "11111111",
  "address": "Rua Y",
  "number": 321,
  "state": "PI",
  "city": "Pedro II"
}
```

E a resposta esperada:

```
Status: 201 CREATED
```

```
{
  "message": "Company successfully created",
  "company": {
    "name": "Empresa LTDA",
    "cnpj": "11111111111111",
    "password": "$2a$10$uU//jY00xEEBKVrHf.EO8e8q7mW8iN4Z16hqXbPmazT1BloFwPTMW",
    "cep": "11111111",
    "address": "Rua Y",
    "number": 321,
    "state": "PI",
    "city": "Pedro II",
    "id": "6e04dede-f165-4735-ac01-da23b7ec26dc",
    "vehicles": []
  }
}
```

Caso falte algum item no body da requisição:

```
{
  "name": "Empresa LTDA",
  "cnpj": "11111111111111",
  "password": "1234",
  "cep": "11111111",
  "address": "Rua Y",
  "number": 321,
  "state": "PI"
}
```

A resposta esperada deverá ser:

```
Status: 400 BAD REQUEST
```

```
{
  "error": "Campo de cidade obrigatório"
}
```

<h4>Login</h4>

Login do usuário recém cadastrado (Método POST): <b>/companies/login</b> (ou localhost:3000/companies/login)

Exemplo a ser colocado no body da requisição:

```
{
	"cnpj": "11111111111111",
	"password": "1234"
}
```

E a resposta esperada:

```
Status: 200 OK
```

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbnBqIjoiMTExMTExMTExMTExMTEiLCJpYXQiOjE2NDMwNDc3MTksImV4cCI6MTY0MzA0ODMyM30.wpjlYlG-kbTrnQAaNMSEbhz6le4a6jA1x4peWlIAyLk",
  "company": {
    "name": "Empresa LTDA",
    "cnpj": "11111111111111",
    "password": "$2a$10$FGnI2uFm2gMqrhHBT3jfIuue.vu9/InkylwGaflzRbDbCwHHAqrjW",
    "cep": "11111111",
    "address": "Rua Y",
    "number": 321,
    "state": "PI",
    "city": "Pedro II",
    "id": "e3f10cb3-44c9-4128-8281-e3f419165013",
    "vehicles": []
  }
}
```

<h4>Listagem</h4>

Listagem dos usuários cadastrados (Método GET): <b>/companies</b> (ou localhost:3000/companies)

Exemplo a ser colocado no body da requisição:

```
(Requisição feita sem body)
```

E a resposta esperada:

```
Status: 200 OK
```

```
[
  {
    "name": "Empresa LTDA",
    "cnpj": "11111111111111",
    "password": "$2a$10$uU//jY00xEEBKVrHf.EO8e8q7mW8iN4Z16hqXbPmazT1BloFwPTMW",
    "cep": "11111111",
    "address": "Rua Y",
    "number": 321,
    "state": "PI",
    "city": "Pedro II",
    "id": "6e04dede-f165-4735-ac01-da23b7ec26dc",
    "vehicles": []
  }
]
```

<h3>AVISO: As próximas duas rotas e em todas as dos veículos necessitam serem autenticadas inserindo-se o mesmo token gerado na rota "/companies/login" no Bearer token da parte Authorization.</h6>

<h4>Atualização de dados:</h4>

Atualização de dados da empresa cadastrada (Método PUT): <b>/companies/:cnpj*</b> (ou localhost:3000/companies/:cnpj*)

\*preencher com o cnpj da empresa anteriormente cadastrada.

Exemplo a ser colocado no body da requisição:

```
{
	"name": "Empresa SA"
}
```

E a resposta esperada:

```
Status: 200 OK
```

```
{
  "messagem": "Company updated",
  "companies": [
    {
      "name": "Empresa SA",
      "cnpj": "11111111111111",
      "password": "$2a$10$.krSnRWuOtMmXx4k/lz2LeWFem4fYA44YZqVm1fM2BMU/DguAt2kC",
      "cep": "11111111",
      "address": "Rua Y",
      "number": 321,
      "state": "PI",
      "city": "Pedro II",
      "id": "9dd008f2-f853-41b0-a115-1f8f819b2067",
      "vehicles": []
    }
  ]
}
```

<h4>Deleção</h4>

Deleção de empresa cadastrada (Método DELETE): <b>/companies/:cnpj*</b> (ou localhost:3000/companies/:cnpj*)

Exemplo a ser colocado no body da requisição:

```
(Requisição feita sem body)
```

E a resposta esperada:

```
Status: 200 OK
```

```
{
  "messagem": "Company deleted",
  "companies": []
}
```

<h3>Rotas Vehicles</h3>

<h4>Cadastro</h4>

Cadastro de veículos no CNPJ da empresa (Método POST): <b>/companies/:cnpj*/vehicles</b> (ou localhost:3000/companies/:cnpj*/vehicles)

Exemplo a ser colocado no body da requisição:

```
{
	"model": "Fusca",
	"brand": "Volkswagen",
	"year": 2016,
	"plate": "DNA-0001"
}
```

E a resposta esperada:

```
Status: 201 CREATED
```

```
{
  "message": "Vehicle Fusca from year 2016 was acquired to the Empresa SA's fleet",
  "vehicle": {
    "model": "Fusca",
    "brand": "Volkswagen",
    "year": 2016,
    "plate": "DNA-0001",
    "id": "4105b594-ee7c-4a80-93b5-4ccf61634349",
    "acquisition_date": "2022-01-24T17:36:05.828Z"
  }
}
```

<h4>Listagem</h4>

Listagem de veículos no CNPJ da empresa (Método GET): <b>/companies/:cnpj*/vehicles</b> (ou localhost:3000/companies/:cnpj*/vehicles)

Exemplo a ser colocado no body da requisição:

```
(Requisição feita sem body)
```

E a resposta esperada:

```
Status: 200 OK
```

```
[
  {
    "model": "Fusca",
    "brand": "Volkswagen",
    "year": 2016,
    "plate": "DNA-0001",
    "id": "4105b594-ee7c-4a80-93b5-4ccf61634349",
    "acquisition_date": "2022-01-24T17:36:05.828Z"
  }
]
```

<h4>Atualização de dados:</h4>

Atualização de dados da empresa cadastrada (Método PUT): <b>/companies/:cnpj*/vehicles/:plate\*\*</b> (ou localhost:3000/companies/:cnpj*/vehicles/:plate\*\*)

\*\*preencher com a placa do veículo anteriormente cadastrado.

Exemplo a ser colocado no body da requisição:

```
{
	"year": 2017
}
```

E a resposta esperada:

```
Status: 200 OK
```

```
{
  "message": "Vehicle updated",
  "vehicle": {
      "name": "Empresa SA",
      "cnpj": "11111111111111",
      "password": "$2a$10$.krSnRWuOtMmXx4k/lz2LeWFem4fYA44YZqVm1fM2BMU/DguAt2kC",
      "cep": "11111111",
      "address": "Rua Y",
      "number": 321,
      "state": "PI",
      "city": "Pedro II",
      "id": "9dd008f2-f853-41b0-a115-1f8f819b2067",
    "vehicles": [
      {
        "model": "Fusca",
        "brand": "Volkswagen",
        "year": 2016,
        "plate": "DNA-0001",
        "id": "4105b594-ee7c-4a80-93b5-4ccf61634349",
        "acquisition_date": "2022-01-24T17:36:05.828Z"
      }
    ],
    "year": 2017
  }
}
```

<h4>Deleção</h4>

Deleção de empresa cadastrada (Método DELETE): <b>/companies/:cnpj*/vehicles/:plate\*\*</b> (ou localhost:3000/companies/:cnpj*/vehicles/:plate\*\*)

Exemplo a ser colocado no body da requisição:

```
(Requisição feita sem body)
```

E a resposta esperada:

```
Status: 200 OK
```

```
{
  "messagem": "Vehicle deleted",
  "vehicles": []
}
```

# Termos de uso

<p>Esta aplicação atende a fins exclusivamente didáticos e não possui qualquer intuito comercial.</p>

# Referências

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/en/4x/api.html)
- [Nodemon](https://nodemon.io/)
- [Sucrase](https://dev.to/evandersonvasconcelos/how-to-use-the-syntax-import-export-on-nodejs-o5b)
- [Yup](https://github.com/jquense/yup)
- [JWT](https://github.com/auth0/node-jsonwebtoken)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Jest](https://jestjs.io/docs/getting-started)
