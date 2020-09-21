import faker from 'faker';

export const TodoEntityMock = {
  id: faker.random.uuid(),
  done: faker.random.boolean(),
  task: faker.random.words(),
};
