import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUserController";
import { ListUserReceiverComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listUserReceiverComplimentsController =
  new ListUserReceiverComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post(
  "/compliment",
  ensureAuthenticated,
  createComplimentController.handle
);
// Usaremos o metodo get abaixo, pois queremos buscar informações
router.get(
  "/users/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);
router.get(
  "/users/compliments/receiver",
  ensureAuthenticated,
  listUserReceiverComplimentsController.handle
);

router.get("/tags",ensureAuthenticated, listTagsController.handle);

router.get("/users",ensureAuthenticated, listUsersController.handle);

export { router };

// Como eu tenho o meu handle recebendo o request e o response na função, não é necessario,
// passar eles aqui.

// Todas as rotas chamadas apos o middleware, são passadas pelo middleware primeiro.

// Basicamento o router diz, quando receber uma requisição do tipo TAL, na rota "/tal",
// iremos executar a função talController.handle e retornaremos a informação que
// essa função retorna
