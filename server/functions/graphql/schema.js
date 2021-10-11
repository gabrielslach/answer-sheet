const typeDefs = `

    ### USER

    input UserInput {
        name: String!
        userType: String!
        section: String
    }

    type UserInfo {
        id: String!
        name: String!
        userType: String!
        section: String
        authToken: String!
    }

    ### CARD

    type Card {
        CardType: String!
        Description: String!
        CorrectAnswer: String
        Choices: [String]
    }

    input CardInput {
        CardType: String!
        Description: String!
        CorrectAnswer: String
        Choices: [String]
    }

    ### ANSWER

    input Answer {
        questionID: String
        answer: String
    }

    ### SHEET INFO

    input SheetInfo {
        teacherID: String
        sectionID: String
        activityID: String
    }

    ##############

    type Query {
        login(name: String): UserInfo!
        getCardDeck(sheetInfo: SheetInfo): [Card]!
    }

    type Mutation {
        addSheet(sheetInfo: SheetInfo, cards: [CardInput]): String!
        addSubmission(userID: String, sheetInfo: SheetInfo, answers: [Answer]): String!
        addUser(userInfo: UserInput): String!
    }
`;

module.exports = typeDefs;