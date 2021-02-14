import { Test } from '@nestjs/testing';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { TodoRepository } from '@/repositories/todo.repository';
import { DeleteTodoService } from '@/services/delete-todo.service';
jest.mock('@/repositories/todo.repository');
describe('DeleteTodoService', () => {
  type SutTypes = { sut: DeleteTodoService; repository: TodoRepository };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [TodoRepository, DeleteTodoService],
    }).compile();
    const service = moduleRef.get<DeleteTodoService>(DeleteTodoService);
    const repository = moduleRef.get<TodoRepository>(TodoRepository);
    const sutTypes = { repository, sut: service };
    return sutTypes;
  };
  it('should remove a TODO', async () => {
    const { sut, repository } = await makeSut();
    await sut.delete(Todo.id);
    expect(repository.remove).toHaveBeenCalledWith(Todo);
  });
});
