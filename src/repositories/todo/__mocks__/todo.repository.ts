export class TodoRepository {
  static readonly todo = {
    id: 'id',
    done: false,
    task: 'task',
  };

  create = jest.fn(() => TodoRepository.todo);
  delete = jest.fn(() => ({ affected: 1 }));
  find = jest.fn(() => [TodoRepository.todo]);
  findOne = jest.fn(() => TodoRepository.todo);
  save = jest.fn(() => TodoRepository.todo);
}
