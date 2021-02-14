export interface ITodo {
  id: string;
  task: string;
  done: boolean;
}

export interface ICreateTodoInput {
  task: string;
}

export interface IUpdateTodoInput {
  task?: string;
  done?: boolean;
}

export interface ITodoService {
  createTodo(createTodoInput: ICreateTodoInput): Promise<ITodo>;
  getAllTodos(): Promise<ITodo[]>;
  findTodoById(id: string): Promise<ITodo | null>;
  removeTodo(id: string): Promise<void>;
  updateTodo(id: string, updateTodoInput: IUpdateTodoInput): Promise<ITodo>;
}
