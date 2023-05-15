import { gql } from 'apollo-server-koa';
 
const strondaSchema = gql`
    type Query {
        boosting(id: Int!): Boosting
        allBoosting: [Boosting]
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
    }
      
    type Boosting {
        userid: Int
        boosterName: String
        originalMmr: String
        goalMmr: String
        finished: Boolean
        boosterId: Int
    }
`;
export default strondaSchema;