import faker from 'faker';

export const TodoEntityMock = {
  id: faker.random.uuid(),
  task: faker.random.words(),
  done: faker.random.boolean(),
};
