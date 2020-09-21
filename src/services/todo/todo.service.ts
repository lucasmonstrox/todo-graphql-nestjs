import { Injectable } from '@nestjs/common';
import { Cacheable, CacheClear, CacheUpdate } from '@type-cacheable/core';

import { TodoEntity } from '@/entities/todo.entity';
import { TodoNotFoundException } from '@/exceptions/todo-not-found.exception';
import { TodoUpdateInput } from '@/inputs/todo-update.input';
import { ITodoService } from '@/interfaces/todo.interface';
import { TodoRepository } from '@/repositories/todo/todo.repository';
import { TodoCreateInput } from '@/inputs/todo-create.input';

@Injectable()
export class TodoService implements ITodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  @CacheUpdate({
    cacheKey: (_, __, todo: TodoEntity) => todo.id,
    cacheKeysToClear: 'todos',
  })
  async createTodo(todoCreateInput: TodoCreateInput): Promise<TodoEntity> {
    const todoAsEntity = this.todoRepository.create(todoCreateInput);
    const todo = await this.todoRepository.save(todoAsEntity);

    return todo;
  }

  @Cacheable({ cacheKey: 'todos' })
  async getAllTodos(): Promise<TodoEntity[]> {
    const todos = await this.todoRepository.find();

    return todos;
  }

  @Cacheable({ cacheKey: ([id]: [string]) => id })
  async getTodo(id: string): Promise<TodoEntity | undefined> {
    const todo = await this.todoRepository.findOne(id);

    return todo;
  }

  @CacheClear({ cacheKey: ([id]: [string]) => [id, 'todos'] })
  async removeTodo(id: string): Promise<void> {
    const todo = await this.todoRepository.findOne(id);
    const todoNotFound = !todo;

    // TODO: add branch test for this
    if (todoNotFound) {
      throw new TodoNotFoundException(id);
    }

    await this.todoRepository.remove(todo);
  }

  @CacheUpdate({
    cacheKey: (_, __, todo: TodoEntity) => todo.id,
    cacheKeysToClear: 'todos',
  })
  async updateTodo(
    id: string,
    todoUpdateInput: TodoUpdateInput,
  ): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne(id);
    const todoNotFound = !todo;

    // TODO: add branch test for this
    if (todoNotFound) {
      throw new TodoNotFoundException(id);
    }

    const todoToUpdate = Object.assign(todo, todoUpdateInput);
    const updatedTodo = await this.todoRepository.save(todoToUpdate);

    return updatedTodo;
  }
}
