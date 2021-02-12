import { Todo } from './todo.interface';
export interface FindAllTodosService {
  find(): Promise<Todo[]>;
}
