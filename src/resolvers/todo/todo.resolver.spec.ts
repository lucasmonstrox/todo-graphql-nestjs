import { TodoUpdateInput } from 'inputs/todo-update.input';
import { TodoRepository } from 'repositories/todo/__mocks__/todo.repository';
import { TodoService } from 'services/todo/__mocks__/todo.service';
import { TodoResolver } from './todo.resolver';

describe('TodoResolver', () => {
  type SutTypes = {
    sut: TodoResolver;
    todoServiceMock: TodoService;
  };

  const makeSut = (): SutTypes => {
    const todoServiceMock = new TodoService();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const todoResolver = new TodoResolver(todoServiceMock);

    return {
      todoServiceMock,
      sut: todoResolver,
    };
  };

  it('should create a todo', async () => {
    const { sut, todoServiceMock } = makeSut();
    const task = 'task';

    expect(await sut.createTodo({ task })).toBe(TodoRepository.todo);
    expect(todoServiceMock.createTodo).toHaveBeenCalledWith(task);
  });

  it('should get all todos', async () => {
    const { sut } = makeSut();

    expect(await sut.getAllTodos()).toMatchObject([TodoRepository.todo]);
  });

  it('should get a todo by id', async () => {
    const { sut, todoServiceMock } = makeSut();

    expect(await sut.getTodoById(TodoRepository.todo.id)).toBe(
      TodoRepository.todo,
    );

    expect(todoServiceMock.getTodoById).toHaveBeenCalledWith(
      TodoRepository.todo.id,
    );
  });

  it('should get a todo by id', async () => {
    const { sut, todoServiceMock } = makeSut();

    expect(await sut.removeTodoById(TodoRepository.todo.id)).toBe(true);

    expect(todoServiceMock.removeTodoById).toHaveBeenCalledWith(
      TodoRepository.todo.id,
    );
  });

  it('should remove a todo by id', async () => {
    const { sut, todoServiceMock } = makeSut();

    expect(await sut.removeTodoById(TodoRepository.todo.id)).toBe(true);

    expect(todoServiceMock.removeTodoById).toHaveBeenCalledWith(
      TodoRepository.todo.id,
    );
  });

  it('should update a todo', async () => {
    const { sut, todoServiceMock } = makeSut();
    const todoUpdateInput: TodoUpdateInput = { done: true, task: 'newTask' };

    expect(await sut.updateTodo(TodoRepository.todo, todoUpdateInput)).toBe(
      TodoRepository.todo,
    );

    expect(todoServiceMock.updateTodo).toHaveBeenCalledWith(
      TodoRepository.todo,
      todoUpdateInput,
    );
  });
});
