import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Todo } from '@/database/entities/todo.entity';
import { CreateTodoInput } from '@/inputs/create-todo.input';
import { CreateTodoService as ICreateTodoService } from '@/interfaces/create-todo.interface';
import { CreateTodoService } from '@/services/create-todo.service';
@Resolver(() => Todo)
export class CreateTodoResolver {
  constructor(
    @Inject(CreateTodoService)
    private createTodoService: ICreateTodoService,
  ) {}
  @Mutation(() => Todo)
  async createTodo(@Args('input') input: CreateTodoInput): Promise<Todo> {
    return await this.createTodoService.create(input);
  }
}
