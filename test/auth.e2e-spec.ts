import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handels a signup request', () => {
    const email = 'asd123@sad.com';
    return request(app.getHttpServer())
      .post('/users/signup')
      .send({email, password: '12334'})
      .expect(201)
      .then((res) => {
        const {id, email} = res.body;
        expect(id).toBeDefined()
        expect(email).toEqual(email)
      })
  });
});
