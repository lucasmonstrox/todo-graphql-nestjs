export interface ITodo {
  id: string;
  done: boolean;
  task: string;
}

export interface ICreateTodoInput {
  task: string;
}

export interface IUpdateTodoInput {
  done?: boolean;
  task?: string;
}

export interface ITodoService {
  createTodo(todoCreateInput: ICreateTodoInput): Promise<ITodo>;
  getAllTodos(): Promise<ITodo[]>;
  getTodo(id: string): Promise<ITodo | null>;
  removeTodo(id: string): Promise<void>;
  updateTodo(id: string, todoUpdateInput: IUpdateTodoInput): Promise<ITodo>;
}
