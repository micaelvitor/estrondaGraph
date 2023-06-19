import { GraphQLError } from 'graphql';
import BoostingModel, { Boosting } from '../../models/booster.js';
import UserModel, { User } from '../../models/user.js';
const resolvers = {
  Query: {
    boosting: async (_: any, { id }: { id: string }): Promise<Boosting | null> => {
      try {
        const boosting = await BoostingModel.findOne({ id }).exec();
        return boosting;
      } 
      catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    allBoosting: async (): Promise<Boosting[]> => {
      try {
        const boosting = await BoostingModel.find().exec();
        return boosting;
      } 
      catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    user: async (_: any, { _id }: { _id: string }): Promise<User | null> => {
      try {
        const user = await UserModel.findOne({ _id }).exec();
        console.log(user)
        return user;
      } 
      catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    allUsers: async (): Promise<User[]> => {
      try {
        const user = await UserModel.find().exec();
        return user;
      } 
      catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    async createBoosting(parent: any, args: { boosting: any; }, context: any, info: any) {
      const boosting  = args;
      const user = await UserModel.create(boosting);
      return user.toObject();
    },
    async createUser(parent: any, args: { user: any; }, context: any, info: any) {
      const userInfo  = args;
      const user = await UserModel.create(userInfo);
      return user.toObject();
    }
  }
};

export default resolvers;