import { TodoUpdateInput } from 'inputs/todo-update.input';
import { TodoRepository } from 'repositories/todo/__mocks__/todo.repository';
import { TodoService } from 'services/todo/__mocks__/todo.service';
import { TodoResolver } from './todo.resolver';

describe('TodoResolver', () => {
  let todoResolver: TodoResolver;
  let todoService: TodoService;

  beforeEach(async () => {
    todoService = new TodoService();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    todoResolver = new TodoResolver(todoService);
  });

  it('should create a todo', async () => {
    const task = 'task';

    expect(await todoResolver.createTodo({ task })).toBe(TodoRepository.todo);
    expect(todoService.createTodo).toHaveBeenCalledWith(task);
  });

  it('should get all todos', async () => {
    expect(await todoResolver.getAllTodos()).toMatchObject([
      TodoRepository.todo,
    ]);
  });

  it('should get a todo by id', async () => {
    expect(await todoResolver.getTodoById(TodoRepository.todo.id)).toBe(
      TodoRepository.todo,
    );
    expect(todoService.getTodoById).toHaveBeenCalledWith(
      TodoRepository.todo.id,
    );
  });

  it('should get a todo by id', async () => {
    expect(await todoResolver.removeTodoById(TodoRepository.todo.id)).toBe(
      true,
    );
    expect(todoService.removeTodoById).toHaveBeenCalledWith(
      TodoRepository.todo.id,
    );
  });

  it('should update a todo', async () => {
    const dataToUpdate: TodoUpdateInput = { done: true, task: 'newTask' };

    expect(
      await todoResolver.updateTodo(TodoRepository.todo, dataToUpdate),
    ).toBe(TodoRepository.todo);
    expect(todoService.updateTodo).toHaveBeenCalledWith(
      TodoRepository.todo,
      dataToUpdate,
    );
  });
});
