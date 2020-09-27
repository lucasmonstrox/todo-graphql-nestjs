import { Escape, Trim } from '@hollowverse/class-sanitizer';
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Escape()
  @Trim()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(100)
  @Field({ nullable: true })
  task?: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  done?: boolean;
}
