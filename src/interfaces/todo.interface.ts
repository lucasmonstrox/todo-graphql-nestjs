export interface ITodo {
  done: boolean;
  id: string;
  task: string;
}

export interface ITodoUpdateInput {
  done?: boolean;
  task?: string;
}

export interface ITodoService {
  createTodo(task: string): Promise<ITodo>;
  getAllTodos(): Promise<ITodo[]>;
  getTodoById(id: string): Promise<ITodo | null>;
  updateTodo(todo: ITodo, dataToUpdate: ITodoUpdateInput): Promise<ITodo>;
}
