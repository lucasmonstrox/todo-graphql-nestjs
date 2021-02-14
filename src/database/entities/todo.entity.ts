import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@ObjectType()
@Entity()
export class Todo {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 100 }) // TODO: export length from definitions
  task: string;
  @Column({ default: false })
  done: boolean;
}
