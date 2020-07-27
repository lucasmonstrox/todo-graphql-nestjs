import { Todo } from 'entities/todo.entity';
import { TodoUpdateInput } from 'inputs/todo-update.input';

export interface ITodoService {
  createTodo(task: string): Promise<Todo>;
  getAllTodos(): Promise<Todo[]>;
  getTodoById(id: string): Promise<Todo | null>;
  removeTodoById(id: string): Promise<boolean>;
  updateTodo(todo: Todo, dataToUpdate: TodoUpdateInput): Promise<Todo>;
}
