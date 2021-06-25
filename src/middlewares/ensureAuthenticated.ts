import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string
}

// a função verify verifica se é um token válido

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o token
  const authToken = request.headers.authorization;
  // Validar se token esta preenchido

  if (!authToken) {
    return response.status(401).end(); //.end retorna a mensagem padrão do status passado
  }
  // Validar se o token é valido
  const [, token] = authToken.split(" "); //Retirar o Bearer do valor armazenado do token

  try {
    const { sub } = verify(token, "91397e5ac0bc54fcdcb56321e73800c1") as IPayload;
    // Recuperar informações do usuário
    request.user_id = sub;
    return next();
  } catch (err) {
    return response.status(401).end();
  }


}
