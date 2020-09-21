import { Test } from '@nestjs/testing';
import faker from 'faker';

import { TodoCreateInput } from '@/infrastructure/graphql/inputs/todo-create.input';
import { TodoUpdateInput } from '@/infrastructure/graphql/inputs/todo-update.input';
import { TodoRepository } from '@/infrastructure/repositories/todo/todo.repository';
import { TodoEntityMock } from '@/infrastructure/test/mocks/entities/todo.entity';
import { TodoService } from '@/use-cases/todo/todo.service';

jest.mock('@/infrastructure/repositories/todo/todo.repository');

describe('TodoService', () => {
  type SutTypes = {
    sut: TodoService;
    todoRepository: TodoRepository;
  };

  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [TodoRepository, TodoService],
    }).compile();
    const todoRepository = moduleRef.get<TodoRepository>(TodoRepository);
    const todoService = moduleRef.get<TodoService>(TodoService);
    const sutTypes = { todoRepository, sut: todoService };

    return sutTypes;
  };

  it('should create a TODO', async () => {
    const { sut, todoRepository } = await makeSut();
    const todoCreateInput: TodoCreateInput = { task: faker.random.words() };

    expect(await sut.createTodo(todoCreateInput)).toBe(TodoEntityMock);
    expect(todoRepository.create).toHaveBeenCalledWith(todoCreateInput);
    expect(todoRepository.save).toHaveBeenCalledWith(TodoEntityMock);
  });

  it('should get all TODOS', async () => {
    const { sut } = await makeSut();

    expect(await sut.getAllTodos()).toMatchObject([TodoEntityMock]);
  });

  it('should get a TODO', async () => {
    const { sut, todoRepository } = await makeSut();

    expect(await sut.getTodo(TodoEntityMock.id)).toBe(TodoEntityMock);
    expect(todoRepository.findOne).toHaveBeenCalledWith(TodoEntityMock.id);
  });

  it('should remove a TODO', async () => {
    const { sut, todoRepository } = await makeSut();

    await sut.removeTodo(TodoEntityMock.id);

    expect(todoRepository.remove).toHaveBeenCalledWith(TodoEntityMock);
  });

  it('should update a TODO', async () => {
    const { sut, todoRepository } = await makeSut();
    const todoUpdateInput: TodoUpdateInput = {
      done: true,
      task: faker.random.words(),
    };

    expect(await sut.updateTodo(TodoEntityMock.id, todoUpdateInput)).toBe(TodoEntityMock);
    expect(todoRepository.save).toHaveBeenCalledWith(
      Object.assign(TodoEntityMock, todoUpdateInput),
    );
  });
});
