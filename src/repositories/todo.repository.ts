import { EntityRepository, Repository } from 'typeorm';
import { Todo } from '@/database/entities/todo.entity';
@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {}
