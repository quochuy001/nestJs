import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserEntity } from './users.entity';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core'
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './Interceptor/current-user.interceptor';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, 
    // {
    // provide: APP_GUARD,
    // useClass: CurrentUserInterceptor,
    // }
],
})
export class UsersModule {
  configure(consume: MiddlewareConsumer){
    consume.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
