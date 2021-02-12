export interface DeleteTodoService {
  delete(id: string): Promise<true>;
}
