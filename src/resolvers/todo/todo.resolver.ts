import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Todo } from 'entities/todo.entity';
import { TodoCreateInput } from 'inputs/todo-create.input';
import { TodoUpdateInput } from 'inputs/todo-update.input';
import { ITodo, ITodoService } from 'interfaces/todo.interface';
import { GetTodoByIdPipe } from 'pipes/get-todo-by-id.pipe';
import { TodoService } from 'services/todo/todo.service';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(
    @Inject(TodoService)
    private readonly todoService: ITodoService,
  ) {}

  @Mutation(() => Todo)
  async createTodo(
    @Args('input')
    { task }: TodoCreateInput, // TODO: Change to interface instead of code implementation. Not supported yet.
  ): Promise<ITodo> {
    const todo = await this.todoService.createTodo(task);

    return todo;
  }

  @Query(() => [Todo])
  async getAllTodos(): Promise<ITodo[]> {
    const todos = await this.todoService.getAllTodos();

    return todos;
  }

  @Query(() => Todo, { nullable: true })
  async getTodoById(@Args('id') id: string): Promise<ITodo | null> {
    const todo = await this.todoService.getTodoById(id);

    return todo;
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('id', { type: () => ID }, GetTodoByIdPipe) todo: ITodo,
    @Args('input') dataToUpdate: TodoUpdateInput, // TODO: Change to interface instead of code implementation. Not supported yet.
  ): Promise<ITodo> {
    const updatedTodo = await this.todoService.updateTodo(todo, dataToUpdate);

    return updatedTodo;
  }
}
