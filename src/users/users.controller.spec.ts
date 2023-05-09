import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';
import { NotFoundException} from '@nestjs/common'

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService> = {
    findOne: (id: number) => Promise.resolve({id, email: 'qw@we.com', password: 'qwewqe'} as UserEntity),
    find: (email: string) => Promise.resolve([{id: 1, email, password: '12234'} as UserEntity])
  }
  let fakeAuthService: Partial<AuthService> = {
    signin: (email: string, password: string) => Promise.resolve({id: 1, email, password} as UserEntity),
    // signup: () => {}
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService
        },
        
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  })


  // it('findUser throws an error if user with given id is not found', async () => {
  //   fakeUserService.findOne = ()=> null;
  //   expect(controller.findUser('1')).resolves.toThrow(
  //     NotFoundException
  //   )
  // })

  it('signin updates session object and  returns user', async () => {
    const session = {userId: -10}
    const user = await controller.singinUser({email: 'asd@asd.com', password: '123'} as UserEntity, session)
  
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  })

});
