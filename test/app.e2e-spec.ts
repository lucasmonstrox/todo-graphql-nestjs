import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('createTodo', () => {
    it('should not create TODO when task is empty', async () => {
      // test missing or empty
    });

    it('should not create TODO when task length is 50 or more', async () => {});

    it('should create TODO', async () => {});
  });

  describe('getTodoById', () => {
    it('should TODO be null when giving inexistent id', async () => {});

    it('should return TODO', async () => {});
  });

  describe('getAllTodos', () => {
    it("should return a list of TODO's", async () => {});
  });

  describe('updateTodo', () => {
    it('should not update TODO when giving inexistent id', async () => {});

    it('should not update TODO when data types are not correct', async () => {
      // test missing or empty
      // test length is 50 or more
    });

    it('should update TODO', async () => {});
  });
});
