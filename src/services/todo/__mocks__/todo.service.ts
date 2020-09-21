import { TodoRepository } from '@/repositories/todo/__mocks__/todo.repository';

export class TodoService {
  createTodo = jest.fn(() => TodoRepository.todo);
  getAllTodos = jest.fn(() => [TodoRepository.todo]);
  getTodo = jest.fn(() => TodoRepository.todo);
  removeTodo = jest.fn(() => true);
  updateTodo = jest.fn(() => TodoRepository.todo);
}
