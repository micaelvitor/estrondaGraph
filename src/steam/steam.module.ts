import { Module } from '@nestjs/common';
import { SteamResolver } from './steam.resolver';

@Module({
  providers: [SteamResolver]
})
export class SteamModule {}
