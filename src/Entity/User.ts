import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    birthYear: string;

    @Column({
        unique: true,
        length: 150
    })
    userName: string;

    @Column()
    password: string;

    @Column()
    isAdmin: boolean;
}