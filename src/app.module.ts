import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/users.entity';
import { ReportEntity } from './reports/reports.entity';
const cookieSession = require('cookie-session');
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    // type: 'sqlite',
    // database: 'db.sqlite',
    // entities: [UserEntity, ReportEntity],
    // synchronize: true
    TypeOrmModule.forRootAsync(
      {
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          return {
            type: 'sqlite',
            database: config.get<string>('DB_NAME'),
            synchronize: true,
            entities: [UserEntity, ReportEntity]
          }
        }
      }
    ),
    // TypeOrmModule.forRoot(),
    UsersModule, ReportsModule],

  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      })
    }
  ]
})
export class AppModule {
  
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: ['huy'],
      })
      )
    .forRoutes('*');
  }
}
