import { Todo } from 'entities/todo.entity';
import { TodoUpdateInput } from 'inputs/todo-update.input';

export interface ITodoService {
  createTodo(task: string): Promise<Todo>;
  getAllTodos(): Promise<Todo[]>;
  getTodoById(id: string): Promise<Todo | null>;
  updateTodo(todo: Todo, dataToUpdate: TodoUpdateInput): Promise<Todo>;
}
