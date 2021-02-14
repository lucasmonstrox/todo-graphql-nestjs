import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Todo } from '../entities/todo.entity';
define(Todo, (faker: typeof Faker) => {
  const todo = new Todo();
  todo.id = faker.random.uuid();
  todo.task = faker.random.words();
  todo.done = faker.random.boolean();
  return todo;
});
