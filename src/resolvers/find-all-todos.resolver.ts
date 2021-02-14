import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from '@/database/entities/todo.entity';
import { FindAllTodosService as IFindAllTodosService } from '@/interfaces/find-all-todos.interface';
import { FindAllTodosService } from '@/services/find-all-todos.service';
// TODO: add e2e tests
@Resolver(() => Todo)
export class FindAllTodosResolver {
  constructor(
    @Inject(FindAllTodosService) private findAllTodos: IFindAllTodosService,
  ) {}
  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return this.findAllTodos.find();
  }
}
