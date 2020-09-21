import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Todo')
@Entity('todo')
export class TodoEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ default: false })
  done: boolean;

  @Field()
  @Column({ length: 100 })
  task: string;
}
