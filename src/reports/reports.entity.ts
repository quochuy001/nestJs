import { UserEntity } from '../users/users.entity';
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity()
export class ReportEntity{
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    price: number;

    @Column()
    made: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    lng: number;

    @Column()
    lat: number;

    @Column()
    mileage: number;
    
    @Column({ default: false })
    approval: boolean

    @ManyToOne(()=> UserEntity, (user)=> user.reports, {eager: true})
    user: UserEntity

}