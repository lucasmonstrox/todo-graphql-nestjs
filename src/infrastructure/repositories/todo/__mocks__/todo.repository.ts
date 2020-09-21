import { TodoEntityMock } from '@/infrastructure/test/mocks/entities/todo.entity';

export class TodoRepository {
  create = jest.fn(() => TodoEntityMock);
  remove = jest.fn();
  find = jest.fn(() => [TodoEntityMock]);
  findOne = jest.fn(() => TodoEntityMock);
  save = jest.fn(() => TodoEntityMock);
}
