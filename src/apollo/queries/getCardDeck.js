import gql from 'graphql-tag';

const getCardDeckQuery = (teacherID, sectionID, activityID) => {
    const query = gql`
        query cardDeckCall($teacherID: String!, $sectionID: String!, $activityID: String!) {
            cardDeck: getCardDeck(
                sheetInfo: {
                    teacherID: $teacherID,
                    sectionID: $sectionID,
                    activityID: $activityID
                }
            ) {
                CardType,
                Description,
                CorrectAnswer,
                Choices,
                id
            }
        }`

    const variables = {
        teacherID,
        sectionID,
        activityID
    };

    return {
        query,
        variables
    }
};

export default getCardDeckQuery;