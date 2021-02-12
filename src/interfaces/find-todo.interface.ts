import { Todo } from './todo.interface';
export interface FindTodoService {
  findById(id: string): Promise<Todo | null>;
}
