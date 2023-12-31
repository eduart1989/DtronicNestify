import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { PrismaService } from '../src/prisma/prisma.service';
import { EditUserDto } from '../src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(
      'http://localhost:3333',
    );
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'eduart@gmail.com',
      password: '123',
      firstName: 'firstName',
      lastName: 'LastName',
    };
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'accessToken');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Eduart',
          email: 'eduart@gmail.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('Banks', () => {
    describe('Get empty banks', () => {
      it('should get banks', () => {
        return pactum
          .spec()
          .get('/banks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody({ data: [], totalPages: 0, totalRows: 0 });
      });
    });

    describe('Create bank', () => {
      const dto = {
        age: faker.datatype.number({
          min: 18,
          max: 65,
        }),
        job: faker.name.jobTitle(),
        marital: 'single',
        education: 'High School',
        default: 'no',
        housing: 'yes',
        loan: 'no',
        contact: 'cellular',
        month: 'may',
        day_of_week: 'mon',
        duration: faker.datatype.number({
          min: 1,
          max: 1000,
        }),
        campaign: faker.datatype.number({
          min: 1,
          max: 10,
        }),
        pdays: faker.datatype.number({
          min: 1,
          max: 30,
        }),
        previous: faker.datatype.number({
          min: 0,
          max: 10,
        }),
        poutcome: 'success',
        emp_var_rate: faker.datatype.float({
          min: -3,
          max: 3,
        }),
        cons_price_idx: faker.datatype.float({
          min: 92,
          max: 94,
        }),
        cons_conf_idx: faker.datatype.float({
          min: -50,
          max: -30,
        }),
        euribor3m: faker.datatype.float({
          min: 0.5,
          max: 5,
        }),
        nr_employed: faker.datatype.float({
          min: 1,
          max: 100,
        }),
        y: 'no',
      };
      it('should create bank', () => {
        return pactum
          .spec()
          .post('/banks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('bankId', 'id');
      });
    });

    describe('Get banks', () => {
      it('should get banks', () => {
        return pactum
          .spec()
          .get('/banks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
      });
    });

    describe('Get bank by id', () => {
      it('should get bank by id', () => {
        return pactum
          .spec()
          .get('/banks/{id}')
          .withPathParams('id', '$S{bankId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{bankId}');
      });
    });

    describe('Edit bank by id', () => {
      const dto = {
        job: 'teacher',
      };
      it('should edit bank', () => {
        return pactum
          .spec()
          .patch('/banks/{id}')
          .withPathParams('id', '$S{bankId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.job);
      });
    });

    describe('Delete bank by id', () => {
      it('should delete bank', () => {
        return pactum
          .spec()
          .delete('/banks/{id}')
          .withPathParams('id', '$S{bankId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(204);
      });

      it('should get empty banks', () => {
        return pactum
          .spec()
          .get('/banks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody({ data: [], totalPages: 0, totalRows: 0 });
      });
    });
  });
});
