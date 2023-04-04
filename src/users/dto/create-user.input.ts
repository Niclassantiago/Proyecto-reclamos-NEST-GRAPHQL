import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => ID )
  id: string;
}
