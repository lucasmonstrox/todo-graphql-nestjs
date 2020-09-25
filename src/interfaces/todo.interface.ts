export interface ITodo {
  id: string;
  done: boolean;
  task: string;
}

export interface ITodoCreateInput {
  task: string;
}

export interface ITodoUpdateInput {
  done?: boolean;
  task?: string;
}

export interface ITodoService {
  createTodo(todoCreateInput: ITodoCreateInput): Promise<ITodo>;
  getAllTodos(): Promise<ITodo[]>;
  getTodo(id: string): Promise<ITodo | null>;
  removeTodo(id: string): Promise<void>;
  updateTodo(id: string, todoUpdateInput: ITodoUpdateInput): Promise<ITodo>;
}
