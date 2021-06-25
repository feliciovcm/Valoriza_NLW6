// Sobrescrevendo tipagens da lib @types

declare namespace Express {
  export interface Request {
    user_id: string;
  }
}
// Está sendo dito que iremos utilizar todas a tipagens do Request que existe
// dentro da lib @types/express e acrescentaremos o user_id com string.

// É necessário mexer o ts config e Habilitar o typeRoots: passando a rota para 
//esse arquivo
