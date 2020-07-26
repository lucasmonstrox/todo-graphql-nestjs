import { BadRequestException } from '@nestjs/common';

import { TodoRepository } from 'repositories/todo/__mocks__/todo.repository';
import { TodoService } from 'services/todo/__mocks__/todo.service';
import { GetTodoByIdPipe } from './get-todo-by-id.pipe';

describe('GetTodoByIdPipe', () => {
  let getTodoByIdPipe: GetTodoByIdPipe;
  let todoService: TodoService;

  beforeEach(async () => {
    todoService = new TodoService();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    getTodoByIdPipe = new GetTodoByIdPipe(todoService);
  });

  it("should throw a BadRequestException when todo doesn't exist", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    todoService.getTodoById.mockImplementationOnce(() => null);

    await expect(
      getTodoByIdPipe.transform(TodoRepository.todo.id),
    ).rejects.toThrow(BadRequestException);
  });

  it('should transform into a todo', async () => {
    expect(await getTodoByIdPipe.transform(TodoRepository.todo.id)).toBe(
      TodoRepository.todo,
    );
    expect(todoService.getTodoById).toHaveBeenCalledWith(
      TodoRepository.todo.id,
    );
  });
});
