import { TodoEntityMock } from '@/mocks/entities/todo.entity';

export class TodoRepository {
  remove = jest.fn();
  find = jest.fn(() => [TodoEntityMock]);
  findOne = jest.fn(() => TodoEntityMock);
  save = jest.fn(() => TodoEntityMock);
}
