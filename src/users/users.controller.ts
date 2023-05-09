import { Controller, Get, Post, Body, Param, NotFoundException, Delete, Patch, 
    UseInterceptors, Query, Session, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { SerializeInterceptor } from '../Interceptor/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto.';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

// Defined the type must be class to use for type of argument's Serialize Decorator
interface ClassConstructor{
    new (...args: any[]): {}
}   
// Generate a Decorator to Use SerializeInterceptor
export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}

@UseGuards(AuthGuard)
@Serialize(UserDto)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) { }
    
    // @Get('/whoami')
    // whoAmI(@Session() session: any){
    //     return this.usersService.findOne(session.userId)
    // }
    
    @UseGuards(AuthGuard)
    @Get('/whoami')
    whoAmI(@CurrentUser( ) user: UserEntity){
        return user;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async singinUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id
        return user;
    }

    @Post('signout')
    signOut(@Session() session: any, @Request() req: any){
        req.session = null;
        session.userId = null;
    }

    @Get("/:id")
    findUser(@Param('id') id: string){
        return this.usersService.findOne(parseInt(id));
    }

    // @UseInterceptors(new SerializeInterceptor(UserDto))

    @Get()
    async getUsersByEmail(@Query('email') email: string){
        return await this.usersService.find(email)
    }

    @Get()
    getAllUser(){
        return this.usersService.findAll()
    }


    @Delete('/:id')
    removeUser(@Param('id') id: string){
        return this.usersService.remove(parseInt(id));
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.usersService.update(parseInt(id), body)
    }
}
