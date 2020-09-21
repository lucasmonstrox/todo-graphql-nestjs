import faker from 'faker';

export class TodoRepository {
  static readonly todo = {
    id: faker.random.uuid(),
    done: faker.random.boolean(),
    task: faker.random.words(),
  };

  create = jest.fn(() => TodoRepository.todo);
  remove = jest.fn();
  find = jest.fn(() => [TodoRepository.todo]);
  findOne = jest.fn(() => TodoRepository.todo);
  save = jest.fn(() => TodoRepository.todo);
}
