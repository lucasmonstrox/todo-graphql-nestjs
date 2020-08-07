import { Inject, Injectable, PipeTransform } from '@nestjs/common';

import { TodoEntity } from 'entities/todo.entity';
import { TodoNotFoundException } from 'exceptions/todo-not-foud.exception';
import { ITodoService } from 'interfaces/todo.interface';
import { TodoService } from 'services/todo/todo.service';

@Injectable()
export class GetTodoByIdPipe implements PipeTransform {
  constructor(
    @Inject(TodoService)
    private readonly todoService: ITodoService,
  ) {}

  async transform(id: string): Promise<TodoEntity> {
    const todo = await this.todoService.getTodoById(id);
    const todoWasNotFound = !todo;

    if (todoWasNotFound) {
      throw new TodoNotFoundException(id);
    }

    return todo;
  }
}
