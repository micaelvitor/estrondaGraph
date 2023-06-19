export const typeDefs = `#graphql
    type Query {
        boosting(id: String!): Boosting
        allBoosting: [Boosting]
        user(_id: String!): User
        allUsers: [User]
    }

    type Mutation {
        createBoosting(
            boosterName: String
            originalMmr: String
            goalMmr: String
            finished: Boolean
            boosterId: String
        ): Boosting
        createUser(
            username: String
            password: String
            email: String
        ): UserMutation
    }
      
    type Boosting {
        _id: String
        boosterName: String
        originalMmr: String
        goalMmr: String
        finished: Boolean
        boosterId: Int
    }

    type User{
        _id: String
        admin: Boolean
        username: String
        email: String
        booster: Boolean
    }

    type UserMutation{
        username: String
        password: String
        email: String
    }
`;
