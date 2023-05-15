import { UserInputError } from 'apollo-server-koa';
import BoostingModel, { Boosting } from '../../database/model/booster.js';

const resolvers = {
  Query: {
    boosting: async (_: any, { id }: { id: number }): Promise<Boosting | null> => {
      try {
        const boosting = await BoostingModel.findOne({ id }).exec();
        return boosting;
      } 
      catch (error: any) {
        throw new UserInputError(error.message);
      }
    },
    allBoosting: async (): Promise<Boosting[]> => {
      try {
        const boosting = await BoostingModel.find().exec();
        return boosting;
      } 
      catch (error: any) {
        throw new UserInputError(error.message);
      }
    },
  },
  Mutation: {
    async createBoosting(args: { boosting: any; }) {
      const boosting  = args;
      const user = await BoostingModel.create(boosting);
      return user.toObject();
    }
  }
};

export default resolvers;