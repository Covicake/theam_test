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

    @Column({
        type: 'varchar',
        default: ''
    })
    birthYear: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    imageName: string;

    @Column()
    createdBy: string;

    @Column()
    lastUpdatedBy: string;
}