import { Connection } from 'mongoose';
import { SteamSchema } from './Steam.schema';

export const steamProviders = [
  {
    provide: 'SteamModule',
    useFactory: (connection: Connection) =>
      connection.model('Steam', SteamSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];