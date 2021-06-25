import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { User };

// Os metodos dentro da tabela não precisa passar nenhum argumento caso o nome seka igual ao nome da tabela
// Exemplo: @Column() // id: string; pq no db o campo chama id, caso desse outro nome
// ficaria @Column("id") // otherId: string;
// Porque utilizar o this?
// Para acessar os atributos de uma classe, como no exemplo acima, é necessaário usar o this.