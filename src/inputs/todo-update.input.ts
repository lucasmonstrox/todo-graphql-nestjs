import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, MaxLength } from 'class-validator';

@InputType()
export class TodoUpdateInput {
  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  done?: boolean;

  @IsOptional()
  @MaxLength(50)
  @Field({ nullable: true })
  task?: string;
}
