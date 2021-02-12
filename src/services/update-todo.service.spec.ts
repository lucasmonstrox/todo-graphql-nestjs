import { Test } from '@nestjs/testing';
import faker from 'faker';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { UpdateTodoInput } from '@/inputs/update-todo.input';
import { TodoRepository } from '@/repositories/todo.repository';
import { UpdateTodoService } from './update-todo.service';
jest.mock('@/repositories/todo.repository');
describe('UpdateTodoService', () => {
  type SutTypes = { sut: UpdateTodoService; repository: TodoRepository };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [TodoRepository, UpdateTodoService],
    }).compile();
    const repository = moduleRef.get<TodoRepository>(TodoRepository);
    const service = moduleRef.get<UpdateTodoService>(UpdateTodoService);
    const sutTypes = { repository, sut: service };
    return sutTypes;
  };
  it('should update a TODO', async () => {
    const { sut, repository } = await makeSut();
    const input: UpdateTodoInput = { task: faker.random.words(), done: true };
    expect(await sut.update(Todo.id, input)).toBe(Todo);
    expect(repository.save).toHaveBeenCalledWith(Object.assign(Todo, input));
  });
});
