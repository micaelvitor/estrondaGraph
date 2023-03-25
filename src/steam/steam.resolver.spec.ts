import { Test, TestingModule } from '@nestjs/testing';
import { SteamResolver } from './steam.resolver';

describe('SteamResolver', () => {
  let resolver: SteamResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SteamResolver],
    }).compile();

    resolver = module.get<SteamResolver>(SteamResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
