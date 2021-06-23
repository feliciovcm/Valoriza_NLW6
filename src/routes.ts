import { Router } from "express";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.post("/users", createUserController.handle);

router.post("/tags", ensureAdmin, createTagController.handle);

export { router };

// Como eu tenho o meu handle recebendo o request e o response na função, não é necessario,
// passar eles aqui.

// Todas as rotas chamadas apos o middleware, são passadas pelo middleware primeiro.
