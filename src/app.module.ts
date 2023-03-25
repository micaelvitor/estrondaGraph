import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SteamService } from './steam/steam.service';
import { SteamResolver } from './steam/steam.resolver';
import { SteamModule } from './steam/steam.module';
import { steamProviders } from './steam/steam.providers';
import { databaseProviders } from './database/database.providers';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [GraphQLModule.forRoot({driver: ApolloDriver}), SteamModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    SteamService,
    SteamResolver,
    ...databaseProviders,
    ...steamProviders,
  ],
})
export class AppModule {}