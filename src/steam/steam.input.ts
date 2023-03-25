import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSteamInput {
  @Field()
  userID: string;

  @Field()
  steamUrl: string;

  @Field()
  steamUser: string;
}