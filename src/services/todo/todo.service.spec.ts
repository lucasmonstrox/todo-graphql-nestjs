import { Test } from '@nestjs/testing';
import faker from 'faker';

import { TodoUpdateInput } from '@/inputs/todo-update.input';
// TODO: use jest.mock instead
import { TodoRepository } from '@/repositories/todo/__mocks__/todo.repository';
import { TodoService } from '@/services/todo/todo.service';

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
    const task = faker.random.words();

    expect(await sut.createTodo(task)).toBe(TodoRepository.todo);
    expect(todoRepository.create).toHaveBeenCalledWith({ task });
    expect(todoRepository.save).toHaveBeenCalledWith(TodoRepository.todo);
  });

  it('should get all TODOS', async () => {
    const { sut } = await makeSut();

    expect(await sut.getAllTodos()).toMatchObject([TodoRepository.todo]);
  });

  it('should get a TODO', async () => {
    const { sut, todoRepository } = await makeSut();

    expect(await sut.getTodo(TodoRepository.todo.id)).toBe(TodoRepository.todo);
    expect(todoRepository.findOne).toHaveBeenCalledWith(TodoRepository.todo.id);
  });

  it('should remove a TODO', async () => {
    const { sut, todoRepository } = await makeSut();

    await sut.removeTodo(TodoRepository.todo.id);

    expect(todoRepository.remove).toHaveBeenCalledWith(TodoRepository.todo);
  });

  it('should update a TODO', async () => {
    const { sut, todoRepository } = await makeSut();
    const todoUpdateInput: TodoUpdateInput = {
      done: true,
      task: faker.random.words(),
    };

    expect(await sut.updateTodo(TodoRepository.todo.id, todoUpdateInput)).toBe(
      TodoRepository.todo,
    );
    expect(todoRepository.save).toHaveBeenCalledWith(
      Object.assign(TodoRepository.todo, todoUpdateInput),
    );
  });
});
