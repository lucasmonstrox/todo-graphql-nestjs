import { Injectable } from '@nestjs/common';
import { CacheClear } from '@type-cacheable/core';
import { todoCacheKey } from '@/consts/todo';
import { TodoRepository } from '@/repositories/todo.repository';
@Injectable()
export class DeleteTodoService {
  constructor(private todoRepository: TodoRepository) {}
  @CacheClear({ cacheKey: ([id]: [string]) => [id, todoCacheKey] })
  async delete(id: string): Promise<true> {
    const todo = await this.todoRepository.findOneOrFail(id);
    await this.todoRepository.remove(todo);
    return true;
  }
}
