import { Test } from '@nestjs/testing';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { FindTodoService } from '@/services/find-todo.service';
import { FindTodoResolver } from './find-todo.resolver';
jest.mock('@/services/find-todo.service');
describe('FindTodoResolver', () => {
  type SutTypes = { sut: FindTodoResolver; service: FindTodoService };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [FindTodoService, FindTodoResolver],
    }).compile();
    const service = moduleRef.get<FindTodoService>(FindTodoService);
    const resolver = moduleRef.get<FindTodoResolver>(FindTodoResolver);
    const sutTypes = { service, sut: resolver };
    return sutTypes;
  };
  it('should find a TODO by id', async () => {
    const { sut, service } = await makeSut();
    expect(await sut.todo(Todo.id)).toBe(Todo);
    expect(service.findById).toHaveBeenCalledWith(Todo.id);
  });
});
