import "reflect-metadata";
import express from "express";
import "./database";
import { router } from "./routes";

const app = express();


app.get("/test", (req, res) => {
  //req => entrando
  // res => saindo
  return res.send("Olá NLW");
});

app.post("/test-post", (req, res) => {
  return res.send("Olá NLW método POST");
});

app.use(express.json());

app.use(router);

app.listen(3000, () => console.log("Server is running"));

/**
 * GET => Buscar uma informação
 * POST => Inserir (criar) uma informação
 * PUT => Alterar uma informação
 * DELETE => Remover dado
 * PATCH => Alterar uma informação específica
 */

/**
 * Tipos de parametros
 * Routes params => http://localhost:3000/produtos/<id>
 * Query params => http://localhost:3000/produtos?name=teclado&type=mecanico&
 * Body params => {
 *  "name": "teclado",
 *  "description": "teclado bom",
 *  "type": "mecanico"
   * }
 */
