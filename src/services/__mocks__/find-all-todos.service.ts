import { Todo } from '@/database/entities/__mocks__/todo.entity';
export class FindAllTodosService {
  find = jest.fn(() => [Todo]);
}
