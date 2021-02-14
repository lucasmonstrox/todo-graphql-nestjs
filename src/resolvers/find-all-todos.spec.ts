import { Test } from '@nestjs/testing';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { FindAllTodosService } from '@/services/find-all-todos.service';
import { FindAllTodosResolver } from './find-all-todos.resolver';
jest.mock('@/services/find-all-todos.service');
describe('FindAllTodosResolver', () => {
  type SutTypes = { sut: FindAllTodosResolver; service: FindAllTodosService };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [FindAllTodosService, FindAllTodosResolver],
    }).compile();
    const service = moduleRef.get<FindAllTodosService>(FindAllTodosService);
    const resolver = moduleRef.get<FindAllTodosResolver>(FindAllTodosResolver);
    const sutTypes = { service, sut: resolver };
    return sutTypes;
  };
  it('should find all TODOS', async () => {
    const { sut } = await makeSut();
    expect(await sut.todos()).toMatchObject([Todo]);
  });
});
