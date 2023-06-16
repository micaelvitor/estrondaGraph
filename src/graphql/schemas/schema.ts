import { gql } from 'apollo-server-koa';
 
const strondaSchema = gql`
    type Query {
        boosting(id: Int!): Boosting
        allBoosting: [Boosting]
        user(id: Int!): [User]
        allUsers: [User]
    }

    type Mutation {
        createBoosting(
            userid: Int
            boosterName: String
            originalMmr: String
            goalMmr: String
            finished: Boolean
            boosterId: Int
        ): Boosting
        createUser(
            username: String
            password: String
            email: String
        ): UserMutation
    }
      
    type Boosting {
        userid: Int
        boosterName: String
        originalMmr: String
        goalMmr: String
        finished: Boolean
        boosterId: Int
    }

    type User{
        userid: Int
        admin: Boolean
        username: String
        password: String
        email: String
        booster: Boolean
        created: String
        update: String
    }

    type UserMutation{
        username: String
        password: String
        email: String
    }
`;
export default strondaSchema;