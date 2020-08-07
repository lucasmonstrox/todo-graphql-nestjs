import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cacheable, CacheClear, CacheUpdate } from '@type-cacheable/core';

import { TodoEntity } from 'entities/todo.entity';
import { TodoCreateInput } from 'inputs/todo-create.input';
import { TodoUpdateInput } from 'inputs/todo-update.input';
import { ITodoService } from 'interfaces/todo.interface';
import { GetTodoByIdPipe } from 'pipes/get-todo-by-id/get-todo-by-id.pipe';
import { SanitizePipe } from 'pipes/sanitize/sanitize.pipe';
import { TodoService } from 'services/todo/todo.service';

@Resolver(() => TodoEntity)
export class TodoResolver {
  constructor(
    @Inject(TodoService)
    private readonly todoService: ITodoService,
  ) {}

  @Mutation(() => TodoEntity)
  @CacheUpdate({
    cacheKey: (args, ctx, todo: TodoEntity) => todo.id,
    cacheKeysToClear: 'todos',
  })
  async createTodo(
    @Args('input', SanitizePipe) { task }: TodoCreateInput,
  ): Promise<TodoEntity> {
    const todo = await this.todoService.createTodo(task);

    return todo;
  }

  @Query(() => [TodoEntity])
  @Cacheable({ cacheKey: 'todos' })
  async getAllTodos(): Promise<TodoEntity[]> {
    const todos = await this.todoService.getAllTodos();

    return todos;
  }

  @Query(() => TodoEntity, { nullable: true })
  @Cacheable({ cacheKey: ([id]: [string]) => id })
  async getTodoById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<TodoEntity | null> {
    const todo = await this.todoService.getTodoById(id);

    return todo;
  }

  @Mutation(() => Boolean)
  @CacheClear({ cacheKey: ([id]: [string]) => [id, 'todos'] })
  async removeTodoById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    const isDeleted = await this.todoService.removeTodoById(id);

    return isDeleted;
  }

  @Mutation(() => TodoEntity)
  @CacheUpdate({
    cacheKey: (args, ctx, todo: TodoEntity) => todo.id,
    cacheKeysToClear: 'todos',
  })
  async updateTodo(
    @Args('id', { type: () => ID }, GetTodoByIdPipe) todo: TodoEntity,
    @Args('input', SanitizePipe) todoUpdateInput: TodoUpdateInput,
  ): Promise<TodoEntity> {
    const updatedTodo = await this.todoService.updateTodo(
      todo,
      todoUpdateInput,
    );

    return updatedTodo;
  }
}
