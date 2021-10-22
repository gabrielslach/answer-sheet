const typeDefs = `

    ### USER

    input UserInput {
        name: String!
        teacherID: String
        sectionID: String
        uid: String!
    }

    type UserInfo {
        uid: String!
        name: String!
        email: String
        userType: String!
        teacherID: String
        sectionID: String
    }

    ### CARD

    type Card {
        CardType: String!
        Description: String!
        CorrectAnswer: String
        Choices: [String],
        id: Int
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
        getUser(userUID: String!): UserInfo
        getCardDeck(sheetInfo: SheetInfo): [Card]!
        getTeachers: [String]!
        getSections(teacherID: String!): [String]!
        getActivities(teacherID: String!, sectionID: String!): [String]!
        getActivitiesOfTeacher(teacherID: String!): [String]!
    }

    type Mutation {
        addSheet(sheetInfo: SheetInfo, cards: [CardInput]): String!
        addSubmission(userID: String, sheetInfo: SheetInfo, answers: [Answer]): String!
        addUser(userInfo: UserInput): String!
    }
`;

module.exports = typeDefs;