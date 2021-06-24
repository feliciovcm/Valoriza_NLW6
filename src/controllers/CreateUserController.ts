import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, admin, password } = request.body;

    const createuserService = new CreateUserService();

    const user = await createuserService.execute({
      name,
      email,
      admin,
      password,
    });

    return response.json(user);
  }
}

export { CreateUserController };

/**
 * Server -> routes -> controller -> Service (Throw error)
 * Pode fazer um try catch no controller, mas para aplicações grandes é melhor
 * fazer a tratativa no server
 */
