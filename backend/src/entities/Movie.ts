import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Food } from "./Food";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    releaseYear!: number;

    @Column()
    genre!: string;

    @OneToMany(() => Food, food => food.movie)
    foods!: Food[];
}
