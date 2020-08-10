import { TodoNotFoundException } from 'exceptions/todo-not-foud.exception';
import { TodoRepository } from 'repositories/todo/__mocks__/todo.repository';
import { TodoService } from 'services/todo/__mocks__/todo.service';
import { GetTodoByIdPipe } from './get-todo-by-id.pipe';

describe('GetTodoByIdPipe', () => {
  type SutTypes = {
    sut: GetTodoByIdPipe;
    todoServiceMock: TodoService;
  };

  const makeSut = (): SutTypes => {
    const todoServiceMock = new TodoService();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const getTodoByIdPipe = new GetTodoByIdPipe(todoServiceMock);
    const sutTypes = { todoServiceMock, sut: getTodoByIdPipe };

    return sutTypes;
  };

  it("should throw a TodoNotFoundException when TODO doesn't was not found", async () => {
    const { sut, todoServiceMock } = makeSut();

    todoServiceMock.getTodoById.mockImplementationOnce(() => null);

    await expect(sut.transform(TodoRepository.todo.id)).rejects.toThrow(
      TodoNotFoundException,
    );
  });

  it('should transform into a TODO', async () => {
    const { sut, todoServiceMock } = makeSut();

    expect(await sut.transform(TodoRepository.todo.id)).toBe(
      TodoRepository.todo,
    );

    expect(todoServiceMock.getTodoById).toHaveBeenCalledWith(
      TodoRepository.todo.id,
    );
  });
});
