Boa tarde, André,

Seguem os feedbacks:

2. Nos routers você poderia ter utilizado o router.use para passar os middlewares que se repetem, por exemplo:
   route.use("/:cnpj", authenticateCompany, verifyCompanyExistence)

3. Seus testes ficaram bem completos, caso queira se aprofundar mais, é possível fazer também os testes unitários de middleware, nesse caso, você teria que fazer o mock do Request, Response e Next e testar o middleware.
   https://codewithhugo.com/express-request-response-mocking/

4. Seus testes ficaram bem completos, parabéns.

5. Na parte do config, você poderia ter dividido em 2 partes, um arquivo para o banco e outro para jwt.

6. Caso quisesse, nos controllers, você poderia ter criado uma classe e utilizado os métodos ao invés de funções.
