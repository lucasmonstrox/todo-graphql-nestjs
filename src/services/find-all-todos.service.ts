import { Injectable } from '@nestjs/common';
import { Cacheable } from '@type-cacheable/core';
import { todoCacheKey } from '@/consts/todo';
import { Todo } from '@/database/entities/todo.entity';
import { TodoRepository } from '@/repositories/todo.repository';
@Injectable()
export class FindAllTodosService {
  constructor(private readonly todoRepository: TodoRepository) {}
  @Cacheable({ cacheKey: todoCacheKey })
  async find(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }
}
