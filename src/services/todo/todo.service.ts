import { Injectable } from '@nestjs/common';

import { TodoEntity } from 'entities/todo.entity';
import { TodoUpdateInput } from 'inputs/todo-update.input';
import { ITodoService } from 'interfaces/todo.interface';
import { TodoRepository } from 'repositories/todo/todo.repository';

@Injectable()
export class TodoService implements ITodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async createTodo(task: string): Promise<TodoEntity> {
    const todoAsEntity = await this.todoRepository.create({ task });
    const todo = await this.todoRepository.save(todoAsEntity);

    return todo;
  }

  async getAllTodos(): Promise<TodoEntity[]> {
    const todos = await this.todoRepository.find();

    return todos;
  }

  async getTodoById(id: string): Promise<TodoEntity | null> {
    const todo = await this.todoRepository.findOne(id);

    return todo;
  }

  async removeTodoById(id: string): Promise<boolean> {
    const { affected } = await this.todoRepository.delete(id);
    const hasBeenDeleted = affected > 0;

    return hasBeenDeleted;
  }

  async updateTodo(
    todo: TodoEntity,
    todoUpdateInput: TodoUpdateInput,
  ): Promise<TodoEntity> {
    const todoToUpdate = Object.assign(todo, todoUpdateInput);
    const updatedTodo = await this.todoRepository.save(todoToUpdate);

    return updatedTodo;
  }
}
