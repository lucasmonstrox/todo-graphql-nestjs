import { Todo } from '@/database/entities/__mocks__/todo.entity';
export class FindTodoService {
  findById = jest.fn(() => Todo);
}
