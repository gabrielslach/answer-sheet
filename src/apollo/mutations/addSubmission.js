import gql from "graphql-tag";

const addSubmissionQuery = (userID, teacherID, sectionID, activityID, answers) => {
    const mutation = gql`
        mutation addSubmission(
            $sheetInfo: SheetInfo,
            $userID: String,
            $answers: [Answer]
            ) {
                addSubmission(
                    userID: $userID,
                    sheetInfo: $sheetInfo,
                    answers: $answers
            )
        }`;

    const variables = {
        sheetInfo: {
            teacherID, 
            sectionID,
            activityID
        },
        userID,
        answers
    }

    return {
        mutation,
        variables
    }
};

export default addSubmissionQuery;