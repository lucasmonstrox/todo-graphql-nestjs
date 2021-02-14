import { Todo } from '@/database/entities/__mocks__/todo.entity';
export class TodoRepository {
  find = jest.fn(() => [Todo]);
  findOne = jest.fn(() => Todo);
  findOneOrFail = jest.fn(() => Todo);
  remove = jest.fn();
  save = jest.fn(() => Todo);
}
