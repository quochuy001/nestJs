import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {
        
    }

    create(email: string, password: string){
        const user = this.repo.create({email: email, password: password})
        return this.repo.save(user);
    }

    async findAll(){
        const listuser = this.repo.find();
        return listuser;
    }

    async findOne(_id: number){
        if(!_id){
            return null;
        }
        const user =  await this.repo.findOne({
            where: {
                id: _id
            }
        });
        if(!user){
            throw new NotFoundException()
        }
        return user;
    }

    async find(email: string){
        return await this.repo.findBy({email})
    }

    async update(id: number, attrs: Partial<UserEntity>){
        const user = await this.findOne(id);
        Object.assign(user, attrs);
        return await this.repo.save(user);
    }

    async remove(id: number){
        const user = await this.findOne(id);
        return this.repo.remove(user);
    }
}
