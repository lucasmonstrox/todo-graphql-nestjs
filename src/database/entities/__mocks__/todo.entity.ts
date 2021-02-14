import faker from 'faker';
export const Todo = {
  id: faker.random.uuid(),
  task: faker.random.words(),
  done: faker.random.boolean(),
};
