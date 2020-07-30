import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from 'app.module';

describe('TodoResolver (e2e)', () => {
  let app: INestApplication;
  let createdTodoId: string;
  let createdTodoIdWithHtmlEntities: string;
  const nonExistentTodoId = 'd984ea01-f5fc-4559-854c-322c5e161c51';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: errors => new BadRequestException(errors),
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('createTodo', () => {
    const createTodoMutation = `
    mutation CreateTodo($input: TodoCreateInput!) {
      createTodo(input: $input) {
        done
        id
        task
      }
    }
    `;

    const operationName = 'CreateTodo';

    it('should not create a TODO when task is empty', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: createTodoMutation,
          variables: { input: { task: '' } },
        })
        .expect(({ body: { errors } }) => {
          expect(errors).toHaveProperty(
            '0.extensions.exception.response.message.0.constraints.isNotEmpty',
            'task should not be empty',
          );
        })
        .expect(200);
    });

    it('should not create a TODO when task length is 100 or more', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: createTodoMutation,
          variables: {
            input: {
              task:
                '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
            },
          },
        })
        .expect(({ body: { errors } }) => {
          expect(errors).toHaveProperty(
            '0.extensions.exception.response.message.0.constraints.maxLength',
            'task must be shorter than or equal to 100 characters',
          );
        })
        .expect(200);
    });

    it('should create a TODO', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: createTodoMutation,
          variables: {
            input: {
              task: 'task',
            },
          },
        })
        .expect(
          ({
            body: {
              data: { createTodo },
            },
          }) => {
            createdTodoId = createTodo.id;

            expect(createTodo).toHaveProperty('done', false);
            expect(createTodo).toHaveProperty('id');
            expect(createTodo).toHaveProperty('task', 'task');
          },
        )
        .expect(200);
    });

    it('should create a TODO and escape html entities and trim spaces', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: createTodoMutation,
          variables: {
            input: {
              task: ' <script></script>  ',
            },
          },
        })
        .expect(
          ({
            body: {
              data: { createTodo },
            },
          }) => {
            createdTodoIdWithHtmlEntities = createTodo.id;

            expect(createTodo).toHaveProperty('done', false);
            expect(createTodo).toHaveProperty('id');
            expect(createTodo).toHaveProperty(
              'task',
              '&lt;script&gt;&lt;&#x2F;script&gt;',
            );
          },
        )
        .expect(200);
    });
  });

  describe('getTodoById', () => {
    const getTodoByIdQuery = `
    query GetTodoById($todoId: ID!) {
      getTodoById(id: $todoId) {
        done
        id
        task
      }
    }
    `;

    const operationName = 'GetTodoById';

    it('should TODO be null when giving inexistent id', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: getTodoByIdQuery,
          variables: {
            todoId: nonExistentTodoId,
          },
        })
        .expect(
          ({
            body: {
              data: { getTodoById },
            },
          }) => {
            expect(getTodoById).toBe(null);
          },
        )
        .expect(200);
    });

    it('should get a TODO', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: getTodoByIdQuery,
          variables: {
            todoId: createdTodoId,
          },
        })
        .expect(
          ({
            body: {
              data: { getTodoById },
            },
          }) => {
            expect(getTodoById).toMatchObject({
              done: false,
              id: createdTodoId,
              task: 'task',
            });
          },
        )
        .expect(200);
    });
  });

  describe('getAllTodos', () => {
    const getAllTodosQuery = `
    query GetAllTodos {
      getAllTodos {
        done
        id
        task
      }
    }
    `;

    const operationName = 'GetAllTodos';

    it('should return a list of TODOS', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: getAllTodosQuery,
        })
        .expect(
          ({
            body: {
              data: { getAllTodos },
            },
          }) => {
            expect(getAllTodos).toMatchObject([
              {
                done: false,
                id: createdTodoId,
                task: 'task',
              },
              {
                done: false,
                id: createdTodoIdWithHtmlEntities,
                task: '&lt;script&gt;&lt;&#x2F;script&gt;',
              },
            ]);
          },
        )
        .expect(200);
    });
  });

  describe('updateTodo', () => {
    const updateTodoMutation = `
    mutation UpdateTodo($todoId: ID!, $input: TodoUpdateInput!) {
      updateTodo(id: $todoId, input: $input) {
        done
        id
        task
      }
    }
    `;

    const operationName = 'UpdateTodo';

    it('should not update a TODO when giving inexistent id', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: updateTodoMutation,
          variables: {
            input: { task: 'updatedTask' },
            todoId: nonExistentTodoId,
          },
        })
        .expect(({ body: { errors } }) => {
          expect(errors).toHaveProperty(
            '0.message',
            'Todo with id "d984ea01-f5fc-4559-854c-322c5e161c51" was not found',
          );
        })
        .expect(200);
    });

    it('should not update a TODO when task is empty', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: updateTodoMutation,
          variables: {
            input: { task: '' },
            todoId: createdTodoId,
          },
        })
        .expect(({ body: { errors } }) => {
          expect(errors).toHaveProperty(
            '0.extensions.exception.response.message.0.constraints.isNotEmpty',
            'task should not be empty',
          );
        })
        .expect(200);
    });

    it('should not update TODO when task length is 100 or more', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: updateTodoMutation,
          variables: {
            input: {
              task:
                '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
            },
            todoId: createdTodoId,
          },
        })
        .expect(({ body: { errors } }) => {
          expect(errors).toHaveProperty(
            '0.extensions.exception.response.message.0.constraints.maxLength',
            'task must be shorter than or equal to 100 characters',
          );
        })
        .expect(200);
    });

    it('should update a TODO', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: updateTodoMutation,
          variables: {
            input: { done: true, task: 'updatedTask' },
            todoId: createdTodoId,
          },
        })
        .expect(
          ({
            body: {
              data: { updateTodo },
            },
          }) => {
            expect(updateTodo).toMatchObject({
              done: true,
              id: createdTodoId,
              task: 'updatedTask',
            });
          },
        )
        .expect(200);
    });

    it('should update a TODO and escape html entities and trim spaces', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: updateTodoMutation,
          variables: {
            input: { done: true, task: ' <script></script> ' },
            todoId: createdTodoId,
          },
        })
        .expect(
          ({
            body: {
              data: { updateTodo },
            },
          }) => {
            expect(updateTodo).toMatchObject({
              done: true,
              id: createdTodoId,
              task: '&lt;script&gt;&lt;&#x2F;script&gt;',
            });
          },
        )
        .expect(200);
    });
  });

  describe('removeTodo', () => {
    const removeTodoByIdMutation = `
    mutation RemoveTodoById($todoId: ID!) {
      removeTodoById(id: $todoId)
    }
    `;

    const operationName = 'RemoveTodoById';

    it('should remove a TODO', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: removeTodoByIdMutation,
          variables: {
            todoId: createdTodoId,
          },
        })
        .expect(
          ({
            body: {
              data: { removeTodoById },
            },
          }) => {
            expect(removeTodoById).toBe(true);
          },
        )
        .expect(200);
    });

    it('should not remove a TODO when giving inexistent id', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName,
          query: removeTodoByIdMutation,
          variables: {
            todoId: nonExistentTodoId,
          },
        })
        .expect(
          ({
            body: {
              data: { removeTodoById },
            },
          }) => {
            expect(removeTodoById).toBe(false);
          },
        )
        .expect(200);
    });
  });
});
