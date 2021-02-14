import { Test } from '@nestjs/testing';
import faker from 'faker';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { CreateTodoService } from '@/services/create-todo.service';
import { CreateTodoResolver } from './create-todo.resolver';
jest.mock('@/services/create-todo.service');
describe('CreateTodoResolver', () => {
  type SutTypes = { sut: CreateTodoResolver; service: CreateTodoService };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [CreateTodoService, CreateTodoResolver],
    }).compile();
    const service = moduleRef.get<CreateTodoService>(CreateTodoService);
    const resolver = moduleRef.get<CreateTodoResolver>(CreateTodoResolver);
    const sutTypes = { service, sut: resolver };
    return sutTypes;
  };
  it('should create a TODO', async () => {
    const { sut, service } = await makeSut();
    const input = { task: faker.random.words() };
    expect(await sut.createTodo(input)).toBe(Todo);
    expect(service.create).toHaveBeenCalledWith(input);
  });
});
