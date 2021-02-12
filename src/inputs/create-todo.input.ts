import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';
@InputType()
export class CreateTodoInput {
  @IsNotEmpty()
  @MaxLength(100) // TODO: export maxlength from definitions
  task: string;
}
