import { Model, FilterQuery } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Steam } from './steam.schema';

@Injectable()
export class SteamService {
  constructor(
    @Inject('Steam_MODEL')
    private steamModel: Model<Steam>,
  ) {}

  async findOne(query: FilterQuery<Steam>): Promise<Steam> {
    return this.steamModel.findOne(query).lean();
  }

  async find(): Promise<Steam[]> {
    return this.steamModel.find().lean();
  }
}