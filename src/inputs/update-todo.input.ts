import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
@InputType()
export class UpdateTodoInput {
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(100) // TODO: export maxlength from definitions
  task?: string;
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
