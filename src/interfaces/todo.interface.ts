import { TodoEntity } from 'entities/todo.entity';
import { TodoUpdateInput } from 'inputs/todo-update.input';

export interface ITodoService {
  createTodo(task: string): Promise<TodoEntity>;
  getAllTodos(): Promise<TodoEntity[]>;
  getTodoById(id: string): Promise<TodoEntity | null>;
  removeTodoById(id: string): Promise<boolean>;
  updateTodo(todo: TodoEntity, todoUpdateInput: TodoUpdateInput): Promise<TodoEntity>;
}
