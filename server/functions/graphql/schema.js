const typeDefs = `
    type Query {
        getCards(sectionID: String, activityID: String): [Card]
    }

    type Mutation {
        addCards(cards: [Card]): String!
    }

    type Card {
        CardType: String!
        Description: String!
        CorrectAnswer: String
        Choices: [String]
    }
`;

module.exports = typeDefs;