import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import faker from 'faker';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { configureApp } from '@/configure';
import { CreateTodoInput } from '@/inputs/create-todo.input';
describe('CreateTodoResolver', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();
  });
  afterAll(async () => await app.close());
  const makePayload = (variables: { input: CreateTodoInput }) => ({
    operationName: 'CreateTodoMutation',
    query: `
      mutation CreateTodoMutation($input: CreateTodoInput!) {
        todo: createTodo(input: $input) {
          id
          task
          done
        }
      }
    `,
    variables,
  });
  it('should return error BAD_USER_INPUT when task is empty', async () => {
    const payload = makePayload({ input: { task: '' } });
    return request(app.getHttpServer())
      .post('/graphql')
      .send(payload)
      .expect(res =>
        expect(res.body.errors[0].extensions.errors).toHaveProperty(
          'task.isNotEmpty',
          'task should not be empty',
        ),
      );
  });
  it('should return error BAD_USER_INPUT when task length is greater than 100', async () => {
    const payload = makePayload({ input: { task: faker.random.words(101) } });
    return request(app.getHttpServer())
      .post('/graphql')
      .send(payload)
      .expect(res =>
        expect(res.body.errors[0].extensions.errors).toHaveProperty(
          'task.maxLength',
          'task must be shorter than or equal to 100 characters',
        ),
      );
  });
  it('should create a TODO', async () => {
    const input = { task: faker.random.words() };
    const payload = makePayload({ input });
    return request(app.getHttpServer())
      .post('/graphql')
      .send(payload)
      .expect(res => {
        const { todo } = res.body.data;
        expect(todo).toHaveProperty('id');
        expect(todo).toMatchObject(input);
      });
  });
});
