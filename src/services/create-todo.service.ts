import { Injectable } from '@nestjs/common';
import { CacheUpdate } from '@type-cacheable/core';
import { todoCacheKey } from '@/consts/todo';
import { Todo } from '@/database/entities/todo.entity';
import { CreateTodoInput } from '@/inputs/create-todo.input';
import { TodoRepository } from '@/repositories/todo.repository';
@Injectable()
export class CreateTodoService {
  constructor(private todoRepository: TodoRepository) {}
  @CacheUpdate({
    cacheKey: (_, __, todo: Todo) => todo.id,
    cacheKeysToClear: todoCacheKey,
  })
  async create(input: CreateTodoInput): Promise<Todo> {
    return await this.todoRepository.save(input);
  }
}
