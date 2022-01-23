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

    input AnswerInput {
        questionID: String
        answer: String
    }

    ### SHEET INFO

    input SheetInfo {
        teacherID: String
        sectionID: String
        activityID: String
    }

    ### ACTIVITIES

    type Submission {
        submissionID: String
        userID: String
        userName: String
        answers: [Answer]
    }

    type Answer {
        questionID: String
        answer: String
    }

    type ActivityInfo {
        activityID: String
        activityName: String
        sectionID: String
        sectionName: String
        teacherID: String
        teacherName: String
        submissions: [Submission]
        deadlineDate: String
    }

    type Activity {
        cardDeck: [Card]!
        submissions: [Submission]
    }

    type Teacher {
        teacherID: String
        teacherName: String
    }

    type Section {
        sectionID: String
        sectionName: String
    }

    ##############

    type Query {
        getUser(userUID: String!): UserInfo
        getCardDeck(activityID: String!): [Card]!
        getTeachers: [Teacher]!
        getSections(teacherID: String!): [Section]!
        getActivitiesOfTeacher(teacherID: String!): [String]!
        getSubmissions(userType:String!, ID: String!): [String]!
        getActivitiesBySectionID(sectionID: String!): [ActivityInfo]!
        getActivitiesByTeacherID(teacherID: String!): [ActivityInfo]!
        getActivity(activityID: String!): Activity
    }

    type Mutation {
        addSheet(sheetInfo: SheetInfo, cards: [CardInput]): String!
        addSubmission(userID: String, sheetInfo: SheetInfo, answers: [AnswerInput]): String!
        addUser(userInfo: UserInput): String!
    }
`;

module.exports = typeDefs;