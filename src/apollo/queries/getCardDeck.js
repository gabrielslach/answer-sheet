import gql from 'graphql-tag';

const getCardDeckQuery = (teacherID, sectionID, activityID) => {
    const query = gql`
        query cardDeckCall($sectionID: String!, $activityID: String!) {
            cardDeck: getCardDeck(
                sheetInfo: {
                    teacherID:"001",
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
        sectionID,
        activityID
    };

    return {
        query,
        variables
    }
};

export default getCardDeckQuery;