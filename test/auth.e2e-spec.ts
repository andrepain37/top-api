import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';
import { AuthDTO } from '../src/auth/dto/auth.dto';
import { USER_NOT_FOUND, WRONG_PASSWORD } from '../src/auth/auth.constants';

const loginDto: AuthDTO = {
	login: 'asd@asd.sdf',
	password: '123'
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
	jest.setTimeout(60000);
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	app = moduleFixture.createNestApplication();
	await app.init();

  });

  it('/auth/login (POST) - success', async () => {
	return request(app.getHttpServer())
		.post('/auth/login')
		.send(loginDto)
		.expect(200)
		.then(({ body }: request.Response)=>{
			expect(body.access_token).toBeDefined();
		});
  });

	it('/auth/login (POST) - failed(password)', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({...loginDto, password: '1'})
			.expect(401)
			.then(({ body }: request.Response)=>{
				const message = body.message;
				expect(message).toBeDefined();
				expect(message).toBe(WRONG_PASSWORD);
			});
	});

	
	it('/auth/login (POST) - failed(email)', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({...loginDto, login: 'asdas2'})
			.expect(401)
			.then(({ body }: request.Response)=>{
				const message = body.message;
				expect(message).toBeDefined();
				expect(message).toBe(USER_NOT_FOUND);
			});
	});



  afterAll(() => {
	disconnect();
  });
});
