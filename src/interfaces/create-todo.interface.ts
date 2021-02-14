import { Todo } from './todo.interface';
export type CreateTodoInput = Pick<Todo, 'task'>;
export interface CreateTodoService {
  create(input: CreateTodoInput): Promise<Todo>;
}
