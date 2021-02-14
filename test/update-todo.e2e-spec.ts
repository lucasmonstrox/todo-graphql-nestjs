import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import faker from 'faker';
import request from 'supertest';
import { factory, useRefreshDatabase, useSeeding } from 'typeorm-seeding';
import { AppModule } from '@/app.module';
import { configureApp } from '@/configure';
import { Todo } from '@/database/entities/todo.entity';
import { UpdateTodoInput } from '@/inputs/update-todo.input';
describe('UpdateTodoResolver', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();
    await useRefreshDatabase({ configName: 'typeorm-seeding.config.ts' });
    await useSeeding();
  });
  afterAll(async () => await app.close());
  const makePayload = (variables: { id: string; input: UpdateTodoInput }) => ({
    operationName: 'UpdateTodoMutation',
    query: `
      mutation UpdateTodoMutation($id: ID!, $input: UpdateTodoInput!) {
        todo: updateTodo(id: $id, input: $input) {
          id
          task
          done
        }
      }
    `,
    variables,
  });
  it('should return error when giving inexistent id', async () => {
    const id = faker.random.uuid();
    const payload = makePayload({ id, input: { task: faker.random.words() } });
    return request(app.getHttpServer())
      .post('/graphql')
      .send(payload)
      .expect(res =>
        expect(res.body.errors[0].message).toBe(
          `Could not find any entity of type "Todo" matching: "${id}"`,
        ),
      );
  });
  it('should return user input errors when task is empty', async () => {
    const { id } = await factory(Todo)().create();
    const payload = makePayload({ id, input: { task: '' } });
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
  it('should return user input errors when task length is greater than 100', async () => {
    const { id } = await factory(Todo)().create();
    const payload = makePayload({
      id,
      input: { task: faker.random.words(101) },
    });
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
  it('should update a TODO', async () => {
    const { id } = await factory(Todo)().create();
    const input = { task: faker.random.words(), done: true };
    const payload = makePayload({ id, input });
    return request(app.getHttpServer())
      .post('/graphql')
      .send(payload)
      .expect(res => expect(res.body.data.todo).toMatchObject(input));
  });
});
