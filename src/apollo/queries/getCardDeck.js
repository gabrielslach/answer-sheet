import gql from 'graphql-tag';

const getCardDeckQuery = (activityID) => {
    const query = gql`
        query cardDeckCall($activityID: String!) {
            cardDeck: getCardDeck(
                    activityID: $activityID
            ) {
                CardType,
                Description,
                CorrectAnswer,
                Choices,
                id
            }
        }`

    const variables = {
        activityID
    };

    return {
        query,
        variables
    }
};

export default getCardDeckQuery;