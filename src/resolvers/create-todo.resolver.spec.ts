import { Test } from '@nestjs/testing';
import faker from 'faker';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { CreateTodoService } from '@/services/create-todo.service';
import { CreateTodoResolver } from './create-todo.resolver';
jest.mock('@/services/create-todo.service');
describe('CreateTodoResolver', () => {
  type SutTypes = {
    sut: CreateTodoResolver;
    createTodoService: CreateTodoService;
  };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [CreateTodoService, CreateTodoResolver],
    }).compile();
    const createTodoService = moduleRef.get<CreateTodoService>(
      CreateTodoService,
    );
    const createTodoResolver = moduleRef.get<CreateTodoResolver>(
      CreateTodoResolver,
    );
    const sutTypes = { createTodoService, sut: createTodoResolver };
    return sutTypes;
  };
  it('should create a TODO', async () => {
    const { sut, createTodoService } = await makeSut();
    const todoCreateInput = { task: faker.random.words() };
    expect(await sut.createTodo(todoCreateInput)).toBe(Todo);
    expect(createTodoService.create).toHaveBeenCalledWith(todoCreateInput);
  });
});
