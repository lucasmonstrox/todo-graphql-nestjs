import { Test } from '@nestjs/testing';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { FindAllTodosService } from '@/services/find-all-todos.service';
import { FindAllTodosResolver } from './find-all-todos.resolver';
jest.mock('@/services/find-all-todos.service');
describe('FindAllTodosResolver', () => {
  type SutTypes = {
    sut: FindAllTodosResolver;
    findAllTodosService: FindAllTodosService;
  };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [FindAllTodosService, FindAllTodosResolver],
    }).compile();
    const findAllTodosService = moduleRef.get<FindAllTodosService>(
      FindAllTodosService,
    );
    const findAllTodosResolver = moduleRef.get<FindAllTodosResolver>(
      FindAllTodosResolver,
    );
    const sutTypes = { findAllTodosService, sut: findAllTodosResolver };
    return sutTypes;
  };
  it('should find all TODOS', async () => {
    const { sut } = await makeSut();
    expect(await sut.todos()).toMatchObject([Todo]);
  });
});
