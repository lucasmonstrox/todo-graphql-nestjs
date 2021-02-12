import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Todo } from '@/database/entities/todo.entity';
import { UpdateTodoService as IUpdateTodoService } from '@/interfaces/update-todo.interface';
import { UpdateTodoService } from '@/services/update-todo.service';
import { UpdateTodoInput } from '@/inputs/update-todo.input';
@Resolver(() => Todo)
export class UpdateTodoResolver {
  constructor(
    @Inject(UpdateTodoService)
    private readonly updateTodoService: IUpdateTodoService,
  ) {}
  @Mutation(() => Todo)
  async updateTodo(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') updateTodoInput: UpdateTodoInput,
  ): Promise<Todo> {
    return await this.updateTodoService.update(id, updateTodoInput);
  }
}
