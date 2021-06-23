import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "./database";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

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
/**
 * Midware => app.use()
 */
