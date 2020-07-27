import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Todo } from 'entities/todo.entity';
import { TodoCreateInput } from 'inputs/todo-create.input';
import { TodoUpdateInput } from 'inputs/todo-update.input';
import { ITodoService } from 'interfaces/todo.interface';
import { GetTodoByIdPipe } from 'pipes/get-todo-by-id.pipe';
import { TodoService } from 'services/todo/todo.service';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(
    @Inject(TodoService)
    private readonly todoService: ITodoService,
  ) {}

  @Mutation(() => Todo)
  async createTodo(@Args('input') { task }: TodoCreateInput): Promise<Todo> {
    const todo = await this.todoService.createTodo(task);

    return todo;
  }

  @Query(() => [Todo])
  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.todoService.getAllTodos();

    return todos;
  }

  @Query(() => Todo, { nullable: true })
  async getTodoById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Todo | null> {
    const todo = await this.todoService.getTodoById(id);

    return todo;
  }

  @Mutation(() => Boolean)
  async removeTodoById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    const isDeleted = await this.todoService.removeTodoById(id);

    return isDeleted;
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('id', { type: () => ID }, GetTodoByIdPipe) todo: Todo,
    @Args('input') dataToUpdate: TodoUpdateInput,
  ): Promise<Todo> {
    const updatedTodo = await this.todoService.updateTodo(todo, dataToUpdate);

    return updatedTodo;
  }
}
