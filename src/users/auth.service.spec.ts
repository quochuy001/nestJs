import {Test, TestingModule} from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

describe('AuthService', ()=> {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>;
    let users: UserEntity[] = [];
    beforeEach(async () => {
        //Create a fake copy of the users service
        fakeUserService = {
            find: (email: string) =>
            {
                const filterUsers = users.filter((user) => user.email === email);
                return Promise.resolve(filterUsers); 
            },

            create: (email: string, password: string) => 
            {
                const user = {id: Math.floor(Math.random() * 99999), email, password} as UserEntity;
                users.push(user);
                return Promise.resolve(user)
            }
        }
        
        const module = await Test.createTestingModule({
            providers: [AuthService,
            {
            provide: UsersService,
            useValue: fakeUserService
            }
        ]
        }).compile();
        
        service = module.get(AuthService);
    
    });
    it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
    })
    it('creates a new user with a salted and hash password', async ()=> {
        const user = await service.signup('qweqw@kask.com', '123456');
        expect(user.password).not.toEqual('123456');
        const [algorithm, round, saltpass] = user.password.split('$');
        expect(saltpass.substring(0, 22)).toBeDefined();
        expect(saltpass.substring(23)).toBeDefined();
    })

    it('throws an error if user signs up with the email that is in use', async () => {
        // fakeUserService.find = () => Promise.resolve([{id: 1, email: '1', password: '1'} as UserEntity]);
        await service.signup('123@ad.com', '123')
        await expect(service.signup('123@ad.com', '213')).rejects.toThrow(
            'email has been exist'
        );
    })

    it('throws if the user sign in with the wrong email', async ()=> {
        await expect(service.signin('3432@asd.com', '12312')).rejects.toThrow(
            'User not found'
        );
    })

    it('throws an error if password is invalid', async ()=> {
        // fakeUserService.find = () => Promise.resolve([{id: 1, email: 'asd@asd.com', password: '123'} as UserEntity]);
        await service.signup('asd123@asd.com', 'password1')
        await expect(service.signin('asd123@asd.com', 'password')).rejects.toThrow(
            'Wrong Password!'
        )
    })
    it('returns an user if the correct password is provided', async ()=> {
        await service.signup('asd@asd.com', '12345');
        const user = await service.signin('asd@asd.com', '12345');
        expect(user).toBeDefined();
    })
})





