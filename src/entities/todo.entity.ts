import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Todo')
@Entity('todo')
export class TodoEntity {
  @Field()
  @Column({ default: false, nullable: false })
  done: boolean;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 100, nullable: false })
  task: string;
}
