import { Test } from '@nestjs/testing';
import faker from 'faker';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { TodoRepository } from '@/repositories/todo.repository';
import { CreateTodoService } from './create-todo.service';
jest.mock('@/repositories/todo.repository');
describe('CreateTodoService', () => {
  type SutTypes = { sut: CreateTodoService; repository: TodoRepository };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [TodoRepository, CreateTodoService],
    }).compile();
    const service = moduleRef.get<CreateTodoService>(CreateTodoService);
    const repository = moduleRef.get<TodoRepository>(TodoRepository);
    const sutTypes = { repository, sut: service };
    return sutTypes;
  };
  it('should create a TODO', async () => {
    const { sut, repository } = await makeSut();
    const todoCreateInput = { task: faker.random.words() };
    expect(await sut.create(todoCreateInput)).toBe(Todo);
    expect(repository.save).toHaveBeenCalledWith(todoCreateInput);
  });
});
