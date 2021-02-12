import { Todo } from './todo.interface';
export type UpdateTodoInput = Partial<Pick<Todo, 'task' | 'done'>>;
export interface UpdateTodoService {
  update(id: string, updateTodoInput: UpdateTodoInput): Promise<Todo>;
}
