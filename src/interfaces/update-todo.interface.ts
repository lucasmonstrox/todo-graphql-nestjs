import { Todo } from './todo.interface';
export type UpdateTodoInput = Partial<Pick<Todo, 'task' | 'done'>>;
export interface UpdateTodoService {
  update(id: string, input: UpdateTodoInput): Promise<Todo>;
}
