import { Test } from '@nestjs/testing';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { TodoRepository } from '@/repositories/todo.repository';
import { FindTodoService } from './find-todo.service';
jest.mock('@/repositories/todo.repository');
describe('FindTodoService', () => {
  type SutTypes = { sut: FindTodoService; repository: TodoRepository };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [TodoRepository, FindTodoService],
    }).compile();
    const service = moduleRef.get<FindTodoService>(FindTodoService);
    const repository = moduleRef.get<TodoRepository>(TodoRepository);
    const sutTypes = { repository, sut: service };
    return sutTypes;
  };
  it('should find a TODO by id', async () => {
    const { sut, repository } = await makeSut();
    expect(await sut.findById(Todo.id)).toBe(Todo);
    expect(repository.findOne).toHaveBeenCalledWith(Todo.id);
  });
});
