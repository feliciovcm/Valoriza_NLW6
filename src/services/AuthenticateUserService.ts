import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    // Trazer o repositorio no qual existe as informações de email e senha
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Verificar se email existe
    const user = await usersRepositories.findOne({
      email,
    });
    // Buscar o email inserido no repositório/banco, para verificar se ele existe
    //ou não

    if (!user) {
      throw new Error("Email/Password incorrect");
    }
    // Nunca colocar precisamente o deu errado no erro, para não deixar claro
    // o que está errado ou não.

    // Verificar se password é correto
    // O método compare do bcrypt vai pegar a senha digitada pelo usuario e vai
    // comparar com a senha criptografada no banco

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    // Gerar token

    const token = sign(
      {
        email: user.email,
      },
      "91397e5ac0bc54fcdcb56321e73800c1",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
