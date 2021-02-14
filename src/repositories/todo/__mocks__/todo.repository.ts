import { TodoEntityMock } from '@/mocks/entities/todo.entity';

export class TodoRepository {
  find = jest.fn(() => [TodoEntityMock]);
  findOne = jest.fn(() => TodoEntityMock);
  remove = jest.fn();
  save = jest.fn(() => TodoEntityMock);
}
