import { Injectable } from '@nestjs/common';
import { Cacheable, CacheClear, CacheUpdate } from '@type-cacheable/core';

import { Todo } from 'entities/todo.entity';
import { TodoUpdateInput } from 'inputs/todo-update.input';
import { ITodoService } from 'interfaces/todo.interface';
import { TodoRepository } from 'repositories/todo/todo.repository';

@Injectable()
export class TodoService implements ITodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  // TODO: Cache it immediately after create. Not possible yet since cache key creation are based on parameters instead of method return
  @CacheClear({ cacheKey: 'todos' })
  async createTodo(task: string): Promise<Todo> {
    const todoAsEntity = await this.todoRepository.create({ task });
    const todo = await this.todoRepository.save(todoAsEntity);

    return todo;
  }

  @Cacheable({ cacheKey: 'todos' })
  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.todoRepository.find();

    return todos;
  }

  @Cacheable({ cacheKey: ([id]: [string]) => id })
  async getTodoById(id: string): Promise<Todo | null> {
    const todo = await this.todoRepository.findOne(id);

    return todo;
  }

  @CacheClear({ cacheKey: ([id]: [string]) => [id, 'todos'] })
  async removeTodoById(id: string): Promise<boolean> {
    const { affected } = await this.todoRepository.delete(id);
    const hasBeenDeleted = affected > 0;

    return hasBeenDeleted;
  }

  @CacheUpdate({
    cacheKey: ([todo]: [Todo, TodoUpdateInput]) => todo.id,
    cacheKeysToClear: 'todos',
  })
  async updateTodo(
    todo: Todo,
    todoUpdateInput: TodoUpdateInput,
  ): Promise<Todo> {
    const todoToUpdate = Object.assign(todo, todoUpdateInput);
    const updatedTodo = await this.todoRepository.save(todoToUpdate);

    return updatedTodo;
  }
}
