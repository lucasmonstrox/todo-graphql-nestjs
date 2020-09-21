import { Test } from '@nestjs/testing';
import faker from 'faker';

import { TodoUpdateInput } from '@/inputs/todo-update.input';
import { TodoEntityMock } from '@/mocks/entities/todo.entity';
import { TodoService } from '@/services/todo/todo.service';
import { TodoResolver } from './todo.resolver';

jest.mock('@/services/todo/todo.service');

describe('TodoResolver', () => {
  type SutTypes = {
    sut: TodoResolver;
    todoService: TodoService;
  };

  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [TodoService, TodoResolver],
    }).compile();
    const todoResolver = moduleRef.get<TodoResolver>(TodoResolver);
    const todoService = moduleRef.get<TodoService>(TodoService);
    const sutTypes = { todoService, sut: todoResolver };

    return sutTypes;
  };

  it('should create a TODO', async () => {
    const { sut, todoService } = await makeSut();
    const todoCreateInput = { task: faker.random.words() };

    expect(await sut.createTodo(todoCreateInput)).toBe(TodoEntityMock);
    expect(todoService.createTodo).toHaveBeenCalledWith(todoCreateInput);
  });

  it('should get all TODOS', async () => {
    const { sut } = await makeSut();

    expect(await sut.getAllTodos()).toMatchObject([TodoEntityMock]);
  });

  it('should get a TODO', async () => {
    const { sut, todoService } = await makeSut();

    expect(await sut.getTodo(TodoEntityMock.id)).toBe(TodoEntityMock);
    expect(todoService.getTodo).toHaveBeenCalledWith(TodoEntityMock.id);
  });

  it('should remove a TODO', async () => {
    const { sut, todoService } = await makeSut();

    await sut.removeTodo(TodoEntityMock.id);

    expect(todoService.removeTodo).toHaveBeenCalledWith(TodoEntityMock.id);
  });

  it('should update a TODO', async () => {
    const { sut, todoService } = await makeSut();
    const todoUpdateInput: TodoUpdateInput = {
      done: true,
      task: faker.random.words(),
    };

    await sut.updateTodo(TodoEntityMock.id, todoUpdateInput);

    expect(todoService.updateTodo).toHaveBeenCalledWith(
      TodoEntityMock.id,
      todoUpdateInput,
    );
  });
});
