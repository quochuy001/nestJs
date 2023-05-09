import { Column, Entity,PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { ReportEntity } from "../reports/reports.entity";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    // @Exclude()
    @Column()
    password: string;

    @Column({ default: true })
    admin: boolean;

    @OneToMany(() => ReportEntity, (reports)=> reports.user)
    reports: ReportEntity[]

    @AfterInsert()
    logInsert(){
        console.log('Insert successfully', this.id);
    }

    @AfterUpdate()
    logUpdate(){
        console.log('Update successfully', this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log('Remove successfully', this);
    }
}