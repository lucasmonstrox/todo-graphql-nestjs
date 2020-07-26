export class TodoRepository {
  static todo = {
    id: 'id',
    done: false,
    task: 'task',
  };

  create = jest.fn(() => TodoRepository.todo);
  find = jest.fn(() => [TodoRepository.todo]);
  findOne = jest.fn(() => TodoRepository.todo);
  save = jest.fn(() => TodoRepository.todo);
}
