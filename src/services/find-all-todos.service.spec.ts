import { Test } from '@nestjs/testing';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { TodoRepository } from '@/repositories/todo.repository';
import { FindAllTodosService } from './find-all-todos.service';
jest.mock('@/repositories/todo.repository');
describe('FindAllTodosService', () => {
  type SutTypes = { sut: FindAllTodosService; repository: TodoRepository };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [TodoRepository, FindAllTodosService],
    }).compile();
    const service = moduleRef.get<FindAllTodosService>(FindAllTodosService);
    const repository = moduleRef.get<TodoRepository>(TodoRepository);
    const sutTypes = { repository, sut: service };
    return sutTypes;
  };
  it('should find all TODOS', async () => {
    const { sut } = await makeSut();
    expect(await sut.find()).toMatchObject([Todo]);
  });
});
