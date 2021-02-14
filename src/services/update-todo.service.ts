import { Injectable } from '@nestjs/common';
import { CacheUpdate } from '@type-cacheable/core';
import { todoCacheKey } from '@/consts/todo';
import { Todo } from '@/database/entities/todo.entity';
import { UpdateTodoInput } from '@/inputs/update-todo.input';
import { TodoRepository } from '@/repositories/todo.repository';
@Injectable()
export class UpdateTodoService {
  constructor(private todoRepository: TodoRepository) {}
  @CacheUpdate({
    cacheKey: (_args, _context, todo: Todo) => todo.id,
    cacheKeysToClear: todoCacheKey,
  })
  async update(id: string, input: UpdateTodoInput): Promise<Todo> {
    const todo = await this.todoRepository.findOneOrFail(id);
    const todoUpdated = Object.assign(todo, input);
    return this.todoRepository.save(todoUpdated);
  }
}
