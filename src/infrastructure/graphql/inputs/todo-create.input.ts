import { Escape, Trim } from '@hollowverse/class-sanitizer';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class TodoCreateInput {
  @Escape()
  @Trim()
  @IsNotEmpty()
  @MaxLength(100)
  @Field()
  task: string;
}
