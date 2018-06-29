import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    birthYear: number;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    token: string;

    @Column()
    isAdmin: boolean;
}