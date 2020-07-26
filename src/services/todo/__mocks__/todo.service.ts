import { TodoRepository } from 'repositories/todo/__mocks__/todo.repository';

export class TodoService {
  createTodo = jest.fn(() => TodoRepository.todo);
  getAllTodos = jest.fn(() => [TodoRepository.todo]);
  getTodoById = jest.fn(() => TodoRepository.todo);
  updateTodo = jest.fn(() => TodoRepository.todo);
}
