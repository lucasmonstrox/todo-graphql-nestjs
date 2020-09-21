import { Test } from '@nestjs/testing';
import faker from 'faker';

import { TodoUpdateInput } from '@/inputs/todo-update.input';
// TODO: use jest.mock instead
import { TodoRepository } from '@/repositories/todo/__mocks__/todo.repository';
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
    const task = faker.random.words();

    expect(await sut.createTodo({ task })).toBe(TodoRepository.todo);
    expect(todoService.createTodo).toHaveBeenCalledWith(task);
  });

  it('should get all TODOS', async () => {
    const { sut } = await makeSut();

    expect(await sut.getAllTodos()).toMatchObject([TodoRepository.todo]);
  });

  it('should get a TODO', async () => {
    const { sut, todoService } = await makeSut();

    expect(await sut.getTodo(TodoRepository.todo.id)).toBe(TodoRepository.todo);
    expect(todoService.getTodo).toHaveBeenCalledWith(TodoRepository.todo.id);
  });

  it('should remove a TODO', async () => {
    const { sut, todoService } = await makeSut();

    await sut.removeTodo(TodoRepository.todo.id);

    expect(todoService.removeTodo).toHaveBeenCalledWith(TodoRepository.todo.id);
  });

  it('should update a TODO', async () => {
    const { sut, todoService } = await makeSut();
    const todoUpdateInput: TodoUpdateInput = {
      done: true,
      task: faker.random.words(),
    };

    await sut.updateTodo(TodoRepository.todo.id, todoUpdateInput);

    expect(todoService.updateTodo).toHaveBeenCalledWith(
      TodoRepository.todo.id,
      todoUpdateInput,
    );
  });
});
