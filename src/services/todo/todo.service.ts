import { Injectable } from '@nestjs/common';
import { Cacheable, CacheClear } from '@type-cacheable/core';

import { Todo } from 'entities/todo.entity';
import { TodoUpdateInput } from 'inputs/todo-update.input';
import { ITodoService } from 'interfaces/todo.interface';
import { TodoRepository } from 'repositories/todo/todo.repository';

@Injectable()
export class TodoService implements ITodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  // TODO: After creation, TODO can be cached. Not supported yet.
  async createTodo(task: string): Promise<Todo> {
    const todoAsEntity = await this.todoRepository.create({ task });
    const todo = await this.todoRepository.save(todoAsEntity);

    return todo;
  }

  // TODO: Cache all todos. Not supported yet.
  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.todoRepository.find();

    return todos;
  }

  @Cacheable({ cacheKey: ([id]: any[]) => id })
  async getTodoById(id: string): Promise<Todo | null> {
    const todo = await this.todoRepository.findOne(id);

    return todo;
  }

  @CacheClear({ cacheKey: ([id]: any[]) => id })
  async removeTodoById(id: string): Promise<boolean> {
    const { affected } = await this.todoRepository.delete(id);
    const hasBeenDeleted = affected > 0;

    return hasBeenDeleted;
  }

  @CacheClear({ cacheKey: ([{ id }]: any[]) => id })
  async updateTodo(todo: Todo, dataToUpdate: TodoUpdateInput): Promise<Todo> {
    const todoToUpdate = Object.assign(todo, dataToUpdate);
    const updatedTodo = await this.todoRepository.save(todoToUpdate);

    return updatedTodo;
  }
}
