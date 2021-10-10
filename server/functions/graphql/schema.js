const typeDefs = `
    type Query {
        getCards(sheetInfo: SheetInfo): [Card]
        getAnswersOfUser(sheetInfo: SheetInfo, userID: String): [Answers]
    }

    type Mutation {
        addCards(cards: [Card]): String!
        addAnswers(sheetInfo: SheetInfo, answers: [Answer]): String!
        addUser(userInfo: User): String!
    }

    type Card {
        CardType: String!
        Description: String!
        CorrectAnswer: String
        Choices: [String]
    }

    type Answer {
        questionID: String
        answer: String
    }

    type SheetInfo {
        teacherID,
        sectionID,
        activityID
    }

    type User {
        id: String
        name: String
        userType: String
        section: String
    }
`;

module.exports = typeDefs;