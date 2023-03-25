import { Resolver, Query } from '@nestjs/graphql';
//import { CreateSteamInput } from './Steam.input';
import { SteamService } from '../Steam/Steam.service';
import { Steam } from './Steam.schema';

@Resolver(() => Steam)
export class SteamResolver {
  constructor(private steamService: SteamService) {}

//   @Mutation(() => Steam)
//   async createSteam(@Args('input') input: CreateSteamInput) {
//     return this.steamService.create(input);
//   }

  @Query(() => [Steam])
  async steams() {
    return this.steamService.find();
  }
}