import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Todo } from '@/database/entities/todo.entity';
import { DeleteTodoService as IDeleteTodoService } from '@/interfaces/delete-todo.interface';
import { DeleteTodoService } from '@/services/delete-todo.service';
// TODO: add e2e tests
@Resolver(() => Todo)
export class DeleteTodoResolver {
  constructor(
    @Inject(DeleteTodoService) private deleteTodoService: IDeleteTodoService,
  ) {}
  @Mutation(() => Boolean)
  async deleteTodo(@Args('id', { type: () => ID }) id: string): Promise<true> {
    return this.deleteTodoService.delete(id);
  }
}
