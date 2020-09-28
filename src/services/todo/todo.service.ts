import { Injectable } from '@nestjs/common';
import { Cacheable, CacheClear, CacheUpdate } from '@type-cacheable/core';

import { TodoEntity } from '@/entities/todo.entity';
import { TodoNotFoundException } from '@/exceptions/todo-not-found.exception';
import { CreateTodoInput } from '@/inputs/create-todo.input';
import { UpdateTodoInput } from '@/inputs/update-todo.input';
import { ITodoService } from '@/interfaces/todo.interface';
import { TodoRepository } from '@/repositories/todo/todo.repository';

@Injectable()
export class TodoService implements ITodoService {
  static readonly cacheKey = 'todos';

  constructor(private readonly todoRepository: TodoRepository) {}

  @CacheUpdate({
    cacheKey: (_, __, todo: TodoEntity) => todo.id,
    cacheKeysToClear: TodoService.cacheKey,
  })
  async createTodo(todoCreateInput: CreateTodoInput): Promise<TodoEntity> {
    const todo = await this.todoRepository.save(todoCreateInput);

    return todo;
  }

  @Cacheable({ cacheKey: TodoService.cacheKey })
  async getAllTodos(): Promise<TodoEntity[]> {
    const todos = await this.todoRepository.find();

    return todos;
  }

  @Cacheable({ cacheKey: ([id]: [string]) => id })
  async findTodoById(id: string): Promise<TodoEntity | undefined> {
    const todo = await this.todoRepository.findOne(id);

    return todo;
  }

  @CacheClear({ cacheKey: ([id]: [string]) => [id, TodoService.cacheKey] })
  async removeTodo(id: string): Promise<void> {
    const todo = await this.getTodoOrThrow(id);

    await this.todoRepository.remove(todo);
  }

  @CacheUpdate({
    cacheKey: (_, __, todo: TodoEntity) => todo.id,
    cacheKeysToClear: TodoService.cacheKey,
  })
  async updateTodo(
    id: string,
    todoUpdateInput: UpdateTodoInput,
  ): Promise<TodoEntity> {
    const todo = await this.getTodoOrThrow(id);
    const todoToUpdate = Object.assign(todo, todoUpdateInput);
    const updatedTodo = await this.todoRepository.save(todoToUpdate);

    return updatedTodo;
  }

  // TODO: add unit tests
  private async getTodoOrThrow(id: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne(id);
    const todoNotFound = !todo;

    // TODO: add branch test for this
    if (todoNotFound) {
      throw new TodoNotFoundException(id);
    }

    return todo;
  }
}
