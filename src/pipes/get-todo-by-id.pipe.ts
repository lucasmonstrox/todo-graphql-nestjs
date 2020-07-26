import {
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { Todo } from 'entities/todo.entity';
import { ITodoService } from 'interfaces/todo.interface';
import { TodoService } from 'services/todo/todo.service';

@Injectable()
export class GetTodoByIdPipe implements PipeTransform {
  constructor(
    @Inject(TodoService)
    private readonly todoService: ITodoService,
  ) {}

  async transform(id: string): Promise<Todo> {
    const todo = await this.todoService.getTodoById(id);
    const todoWasNotFound = !todo;

    if (todoWasNotFound) {
      // TODO: Add context exception
      throw new BadRequestException(`Todo with id "${id}" was not found`);
    }

    return todo;
  }
}
