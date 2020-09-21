import { TodoEntity } from '@/entities/todo.entity';
import { TodoCreateInput } from '@/inputs/todo-create.input';
import { TodoUpdateInput } from '@/inputs/todo-update.input';

export interface ITodoService {
  createTodo(todoCreateInput: TodoCreateInput): Promise<TodoEntity>;
  getAllTodos(): Promise<TodoEntity[]>;
  getTodo(id: string): Promise<TodoEntity | null>;
  removeTodo(id: string): Promise<void>;
  updateTodo(id: string, todoUpdateInput: TodoUpdateInput): Promise<TodoEntity>;
}
