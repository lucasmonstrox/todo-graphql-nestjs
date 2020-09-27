import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TodoEntity } from '@/entities/todo.entity';
import { CreateTodoInput } from '@/inputs/create-todo.input';
import { UpdateTodoInput } from '@/inputs/update-todo.input';
import { ITodoService } from '@/interfaces/todo.interface';
import { SanitizePipe } from '@/pipes/sanitize/sanitize.pipe';
import { TodoService } from '@/services/todo/todo.service';

@Resolver(() => TodoEntity)
export class TodoResolver {
  constructor(
    @Inject(TodoService)
    private readonly todoService: ITodoService,
  ) {}

  @Mutation(() => TodoEntity)
  async createTodo(
    @Args('input', SanitizePipe)
    createTodoInput: CreateTodoInput,
  ): Promise<TodoEntity> {
    const todo = await this.todoService.createTodo(createTodoInput);

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
    updateTodoInput: UpdateTodoInput,
  ): Promise<TodoEntity> {
    const updatedTodo = await this.todoService.updateTodo(id, updateTodoInput);

    return updatedTodo;
  }
}
