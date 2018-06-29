import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    lastName: string;

    @Column()
    birthYear: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    imagePath: string;
}