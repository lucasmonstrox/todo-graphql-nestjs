import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class TodoCreateInput {
  @IsNotEmpty()
  @MaxLength(50)
  @Field()
  task: string;
}
