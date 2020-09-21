import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ITodoService } from '@/domain/todo';
import { TodoEntity } from '@/infrastructure/database/entities/todo.entity';
import { TodoCreateInput } from '@/infrastructure/graphql/inputs/todo-create.input';
import { TodoUpdateInput } from '@/infrastructure/graphql/inputs/todo-update.input';
import { SanitizePipe } from '@/infrastructure/pipes/sanitize/sanitize.pipe';
import { TodoService } from '@/use-cases/todo/todo.service';

@Resolver(() => TodoEntity)
export class TodoResolver {
  constructor(
    @Inject(TodoService)
    private readonly todoService: ITodoService,
  ) {}

  @Mutation(() => TodoEntity)
  async createTodo(
    @Args('input', SanitizePipe)
    todoCreateInput: TodoCreateInput,
  ): Promise<TodoEntity> {
    const todo = await this.todoService.createTodo(todoCreateInput);

    return todo;
  }

  @Query(() => [TodoEntity])
  async getAllTodos(): Promise<TodoEntity[]> {
    const todos = await this.todoService.getAllTodos();

    return todos;
  }

  @Query(() => TodoEntity, { nullable: true })
  async getTodo(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<TodoEntity | undefined> {
    const todo = await this.todoService.getTodo(id);

    return todo;
  }

  @Mutation(() => Boolean)
  async removeTodo(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<true> {
    await this.todoService.removeTodo(id);

    return true;
  }

  @Mutation(() => TodoEntity)
  async updateTodo(
    @Args('id', { type: () => ID })
    id: string,
    @Args('input', SanitizePipe)
    todoUpdateInput: TodoUpdateInput,
  ): Promise<TodoEntity> {
    const updatedTodo = await this.todoService.updateTodo(id, todoUpdateInput);

    return updatedTodo;
  }
}
