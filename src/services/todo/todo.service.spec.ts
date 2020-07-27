import { TodoUpdateInput } from 'inputs/todo-update.input';
import { TodoRepository } from 'repositories/todo/__mocks__/todo.repository';
import { TodoService } from 'services/todo/todo.service';

describe('TodoService', () => {
  let todoRepository: TodoRepository;
  let todoService: TodoService;

  beforeEach(async () => {
    todoRepository = new TodoRepository();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    todoService = new TodoService(todoRepository);
  });

  it('should create a todo', async () => {
    const task = 'task';

    expect(await todoService.createTodo(task)).toBe(TodoRepository.todo);
    expect(todoRepository.create).toHaveBeenCalledWith({ task });
    expect(todoRepository.save).toHaveBeenCalledWith(TodoRepository.todo);
  });

  it('should get all todos', async () => {
    expect(await todoService.getAllTodos()).toMatchObject([
      TodoRepository.todo,
    ]);
  });

  it('should get a todo by id', async () => {
    expect(await todoService.getTodoById(TodoRepository.todo.id)).toBe(
      TodoRepository.todo,
    );
    expect(todoRepository.findOne).toHaveBeenCalledWith(TodoRepository.todo.id);
  });

  it('should remove a todo by id', async () => {
    expect(await todoService.removeTodoById(TodoRepository.todo.id)).toBe(true);
    expect(todoRepository.delete).toHaveBeenCalledWith(TodoRepository.todo.id);
  });

  it('should update a todo', async () => {
    const dataToUpdate: TodoUpdateInput = { done: true, task: 'newTask' };

    expect(
      await todoService.updateTodo(TodoRepository.todo, dataToUpdate),
    ).toBe(TodoRepository.todo);
    expect(todoRepository.save).toHaveBeenCalledWith(
      Object.assign(TodoRepository.todo, dataToUpdate),
    );
  });
});
