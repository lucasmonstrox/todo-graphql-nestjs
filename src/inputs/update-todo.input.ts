import { Escape, Trim } from '@hollowverse/class-sanitizer';
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  done?: boolean;

  @Escape()
  @Trim()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(100)
  @Field({ nullable: true })
  task?: string;
}
