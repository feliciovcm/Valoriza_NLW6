import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserControlle";

const router = Router();

const createUserController = new CreateUserController();

router.post("/users", createUserController.handle);

export { router };

// Como eu tenho o meu handle recebendo o request e o response na função, não é necessario,
// passar eles aqui.
