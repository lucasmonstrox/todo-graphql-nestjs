import { TodoUpdateInput } from 'inputs/todo-update.input';
import { TodoRepository } from 'repositories/todo/__mocks__/todo.repository';
import { TodoService } from 'services/todo/todo.service';

describe('TodoService', () => {
  type SutTypes = {
    sut: TodoService;
    todoRepositoryMock: TodoRepository;
  };

  const makeSut = (): SutTypes => {
    const todoRepositoryMock = new TodoRepository();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const todoService = new TodoService(todoRepositoryMock);
    const sutTypes = { todoRepositoryMock, sut: todoService };

    return sutTypes;
  };

  it('should create a TODO', async () => {
    const { sut, todoRepositoryMock } = makeSut();
    const task = 'task';

    expect(await sut.createTodo(task)).toBe(TodoRepository.todo);
    expect(todoRepositoryMock.create).toHaveBeenCalledWith({ task });
    expect(todoRepositoryMock.save).toHaveBeenCalledWith(TodoRepository.todo);
  });

  it('should get all TODOS', async () => {
    const { sut } = makeSut();

    expect(await sut.getAllTodos()).toMatchObject([TodoRepository.todo]);
  });

  it('should get a TODO by id', async () => {
    const { sut, todoRepositoryMock } = makeSut();

    expect(await sut.getTodoById(TodoRepository.todo.id)).toBe(
      TodoRepository.todo,
    );

    expect(todoRepositoryMock.findOne).toHaveBeenCalledWith(
      TodoRepository.todo.id,
    );
  });

  it('should remove a TODO by id', async () => {
    const { sut, todoRepositoryMock } = makeSut();

    expect(await sut.removeTodoById(TodoRepository.todo.id)).toBe(true);

    expect(todoRepositoryMock.delete).toHaveBeenCalledWith(
      TodoRepository.todo.id,
    );
  });

  it('should update a TODO', async () => {
    const { sut, todoRepositoryMock } = makeSut();
    const todoUpdateInput: TodoUpdateInput = { done: true, task: 'newTask' };

    expect(await sut.updateTodo(TodoRepository.todo, todoUpdateInput)).toBe(
      TodoRepository.todo,
    );

    expect(todoRepositoryMock.save).toHaveBeenCalledWith(
      Object.assign(TodoRepository.todo, todoUpdateInput),
    );
  });
});
