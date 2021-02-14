import { Inject } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Todo } from '@/database/entities/todo.entity';
import { FindTodoService as IFindTodoService } from '@/interfaces/find-todo.interface';
import { FindTodoService } from '@/services/find-todo.service';
@Resolver(() => Todo)
export class FindTodoResolver {
  constructor(
    @Inject(FindTodoService) private findTodoService: IFindTodoService,
  ) {}
  @Query(() => Todo, { nullable: true })
  async todo(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Todo | undefined> {
    return await this.findTodoService.findById(id);
  }
}
