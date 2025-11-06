import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Food } from "./Food";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // Um usuário pode ter várias receitas favoritas
  @OneToMany(() => Food, (food) => food.user, { cascade: true })
  foods!: Food[];
}
