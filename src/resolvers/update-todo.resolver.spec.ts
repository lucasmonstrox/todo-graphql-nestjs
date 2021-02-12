import { Test } from '@nestjs/testing';
import faker from 'faker';
import { UpdateTodoInput } from '@/inputs/update-todo.input';
import { Todo } from '@/database/entities/__mocks__/todo.entity';
import { UpdateTodoService } from '@/services/update-todo.service';
import { UpdateTodoResolver } from './update-todo.resolver';
jest.mock('@/services/update-todo.service');
describe('UpdateTodoResolver', () => {
  type SutTypes = {
    sut: UpdateTodoResolver;
    updateTodoService: UpdateTodoService;
  };
  const makeSut = async (): Promise<SutTypes> => {
    const moduleRef = await Test.createTestingModule({
      providers: [UpdateTodoService, UpdateTodoResolver],
    }).compile();
    const updateTodoResolver = moduleRef.get<UpdateTodoResolver>(
      UpdateTodoResolver,
    );
    const updateTodoService = moduleRef.get<UpdateTodoService>(
      UpdateTodoService,
    );
    const sutTypes = { updateTodoService, sut: updateTodoResolver };
    return sutTypes;
  };
  it('should update a TODO', async () => {
    const { sut, updateTodoService } = await makeSut();
    const todoUpdateInput: UpdateTodoInput = {
      task: faker.random.words(),
      done: true,
    };
    await sut.updateTodo(Todo.id, todoUpdateInput);
    expect(updateTodoService.update).toHaveBeenCalledWith(
      Todo.id,
      todoUpdateInput,
    );
  });
});
