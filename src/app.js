import express from "express";

const port = 3000;

let app = express();
app.use(express.json());

app.listen(port, () => {
  console.log("App running");
});

export default app;
