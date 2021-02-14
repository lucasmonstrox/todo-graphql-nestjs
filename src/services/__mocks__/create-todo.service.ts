import { Todo } from '@/database/entities/__mocks__/todo.entity';
export class CreateTodoService {
  create = jest.fn(() => Todo);
}
