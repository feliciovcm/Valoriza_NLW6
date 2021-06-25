import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}
// Lembrando que o execute é um nome criado para a função, não precisa ser
// necessariamente execute, pode ser qualquer nome que você desejar mas é sempre
// bom manter um padrão.

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const userRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await userRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });
    // quando o valor que será gravado dentro do campo for diferente do valor
    // inserido, deve-se passar o nome do campo, dois pontos, novo valor.
    // Ex: password: passwordHash

    await userRepository.save(user);

    return user;
  }
}

export { CreateUserService };

/**
 * Controller -> Service (Lançar exceção = throw new Error)
 * Ou seja, o service lança a exceção e o controller trata o erro
 */