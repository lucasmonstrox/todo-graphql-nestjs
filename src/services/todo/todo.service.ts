import { Injectable } from '@nestjs/common';

import {
  ITodo,
  ITodoService,
  ITodoUpdateInput,
} from 'interfaces/todo.interface';
import { TodoRepository } from 'repositories/todo/todo.repository';

@Injectable()
export class TodoService implements ITodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async createTodo(task: string): Promise<ITodo> {
    const todoAsEntity = await this.todoRepository.create({ task });
    const todo = await this.todoRepository.save(todoAsEntity);

    return todo;
  }

  async getAllTodos(): Promise<ITodo[]> {
    const todos = await this.todoRepository.find();

    return todos;
  }

  async getTodoById(id: string): Promise<ITodo | null> {
    const todo = await this.todoRepository.findOne(id);

    return todo;
  }

  async updateTodo(
    todo: ITodo,
    dataToUpdate: ITodoUpdateInput,
  ): Promise<ITodo> {
    const todoToUpdate = Object.assign(todo, dataToUpdate);
    const updatedTodo = await this.todoRepository.save(todoToUpdate);

    return updatedTodo;
  }
}
