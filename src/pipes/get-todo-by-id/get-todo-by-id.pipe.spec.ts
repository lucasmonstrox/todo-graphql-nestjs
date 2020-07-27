import { NotFoundException } from '@nestjs/common';

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

    return {
      todoServiceMock,
      sut: getTodoByIdPipe,
    };
  };

  it("should throw a BadRequestException when todo doesn't exist", async () => {
    const { sut, todoServiceMock } = makeSut();

    todoServiceMock.getTodoById.mockImplementationOnce(() => null);

    await expect(sut.transform(TodoRepository.todo.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should transform into a todo', async () => {
    const { sut, todoServiceMock } = makeSut();

    expect(await sut.transform(TodoRepository.todo.id)).toBe(
      TodoRepository.todo,
    );

    expect(todoServiceMock.getTodoById).toHaveBeenCalledWith(
      TodoRepository.todo.id,
    );
  });
});
