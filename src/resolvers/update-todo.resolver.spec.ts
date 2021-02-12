import { Test } from '@nestjs/testing';
import faker from 'faker';
import { UpdateTodoInput } from '@/inputs/update-todo.input';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { UpdateTodoService } from '@/services/update-todo.service';
import { UpdateTodoResolver } from './update-todo.resolver';
jest.mock('@/services/update-todo.service');
describe('UpdateTodoResolver', () => {
  type SutTypes = { sut: UpdateTodoResolver; service: UpdateTodoService };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [UpdateTodoService, UpdateTodoResolver],
    }).compile();
    const resolver = moduleRef.get<UpdateTodoResolver>(UpdateTodoResolver);
    const service = moduleRef.get<UpdateTodoService>(UpdateTodoService);
    const sutTypes = { service, sut: resolver };
    return sutTypes;
  };
  it('should update a TODO', async () => {
    const { sut, service } = await makeSut();
    const todoUpdateInput: UpdateTodoInput = {
      task: faker.random.words(),
      done: true,
    };
    await sut.updateTodo(Todo.id, todoUpdateInput);
    expect(service.update).toHaveBeenCalledWith(Todo.id, todoUpdateInput);
  });
});
