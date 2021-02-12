import { Test } from '@nestjs/testing';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { DeleteTodoService } from '@/services/delete-todo.service';
import { DeleteTodoResolver } from './delete-todo.resolver';
jest.mock('@/services/delete-todo.service');
describe('DeleteTodoResolver', () => {
  type SutTypes = {
    sut: DeleteTodoResolver;
    deleteTodoService: DeleteTodoService;
  };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [DeleteTodoService, DeleteTodoResolver],
    }).compile();
    const deleteTodoService = moduleRef.get<DeleteTodoService>(
      DeleteTodoService,
    );
    const deleteTodoResolver = moduleRef.get<DeleteTodoResolver>(
      DeleteTodoResolver,
    );
    const sutTypes = { deleteTodoService, sut: deleteTodoResolver };
    return sutTypes;
  };
  it('should delete a TODO', async () => {
    const { sut, deleteTodoService } = await makeSut();
    await sut.deleteTodo(Todo.id);
    expect(deleteTodoService.delete).toHaveBeenCalledWith(Todo.id);
  });
});
