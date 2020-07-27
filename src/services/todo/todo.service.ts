import { Injectable } from '@nestjs/common';

import { Todo } from 'entities/todo.entity';
import { ITodoService } from 'interfaces/todo.interface';
import { TodoRepository } from 'repositories/todo/todo.repository';
import { TodoUpdateInput } from 'inputs/todo-update.input';

@Injectable()
export class TodoService implements ITodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async createTodo(task: string): Promise<Todo> {
    const todoAsEntity = await this.todoRepository.create({ task });
    const todo = await this.todoRepository.save(todoAsEntity);

    return todo;
  }

  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.todoRepository.find();

    return todos;
  }

  async getTodoById(id: string): Promise<Todo | null> {
    const todo = await this.todoRepository.findOne(id);

    return todo;
  }

  async removeTodoById(id: string): Promise<boolean> {
    const { affected } = await this.todoRepository.delete(id);
    const hasBeenDeleted = affected > 0;

    return hasBeenDeleted;
  }

  async updateTodo(todo: Todo, dataToUpdate: TodoUpdateInput): Promise<Todo> {
    const todoToUpdate = Object.assign(todo, dataToUpdate);
    const updatedTodo = await this.todoRepository.save(todoToUpdate);

    return updatedTodo;
  }
}
