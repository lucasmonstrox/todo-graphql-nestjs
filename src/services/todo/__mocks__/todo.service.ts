import { TodoEntityMock } from '@/mocks/entities/todo.entity';

export class TodoService {
  createTodo = jest.fn(() => TodoEntityMock);
  getAllTodos = jest.fn(() => [TodoEntityMock]);
  getTodo = jest.fn(() => TodoEntityMock);
  removeTodo = jest.fn(() => true);
  updateTodo = jest.fn(() => TodoEntityMock);
}
