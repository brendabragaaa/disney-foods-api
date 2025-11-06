import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Movie } from "./Movie";
import { User } from "./User";

@Entity()
export class Food {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column("simple-array")
    ingredients!: string[];

    @Column("simple-array")
    recipe!: string[];

    @Column({ default: false })
    isMagical!: boolean;

    @ManyToOne(() => Movie, movie => movie.foods)
    movie!: Movie;

    @ManyToOne(() => User, (user) => user.foods)
    user!: User;
}