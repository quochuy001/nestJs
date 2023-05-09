import {Injectable, BadRequestException, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService{
    constructor(private usersService: UsersService) {
        
    }


    async signup(email: string, password: string){
        const user = await this.usersService.find(email);
        if(user.length){
            throw new BadRequestException('email has been exist');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);

        const newUser = await this.usersService.create(email, hashPassword);
        return newUser;
    }

    async signin(email: string, password: string){
        const [user] = await this.usersService.find(email);
        if(!user){
            throw new NotFoundException('User not found'); 
        }
        
        const passIsValid = await bcrypt.compare(password, user.password);
        if(passIsValid){
            return user;
        }
        else{ 
            throw new UnauthorizedException('Wrong Password!')
        }

    }
}