import { Field, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const SteamSchema = new mongoose.Schema({
  _id: String,
  userID: String,
  SteamUrl: String,
  steamUser: String
});

@ObjectType()
export class Steam extends Document {
  @Field()
  userID: string;

  @Field()
  SteamUrl: string;

  @Field()
  SteamUser: string;
}