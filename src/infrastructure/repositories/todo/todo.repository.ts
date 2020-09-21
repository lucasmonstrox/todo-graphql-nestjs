import { EntityRepository, Repository } from 'typeorm';

import { TodoEntity } from '@/infrastructure/database/entities/todo.entity';

@EntityRepository(TodoEntity)
export class TodoRepository extends Repository<TodoEntity> {}
