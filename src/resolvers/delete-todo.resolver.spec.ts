import { Test } from '@nestjs/testing';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { DeleteTodoService } from '@/services/delete-todo.service';
import { DeleteTodoResolver } from './delete-todo.resolver';
jest.mock('@/services/delete-todo.service');
describe('DeleteTodoResolver', () => {
  type SutTypes = { sut: DeleteTodoResolver; service: DeleteTodoService };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [DeleteTodoService, DeleteTodoResolver],
    }).compile();
    const service = moduleRef.get<DeleteTodoService>(DeleteTodoService);
    const resolver = moduleRef.get<DeleteTodoResolver>(DeleteTodoResolver);
    const sutTypes = { service, sut: resolver };
    return sutTypes;
  };
  it('should delete a TODO', async () => {
    const { sut, service } = await makeSut();
    await sut.deleteTodo(Todo.id);
    expect(service.delete).toHaveBeenCalledWith(Todo.id);
  });
});
