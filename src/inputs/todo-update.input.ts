import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, MaxLength } from 'class-validator';

import { ITodoUpdateInput } from '../interfaces/todo.interface';

@InputType()
export class TodoUpdateInput implements ITodoUpdateInput {
  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  done?: boolean;

  @IsOptional()
  @MaxLength(50)
  @Field({ nullable: true })
  task?: string;
}
