import gql from 'graphql-tag';

const getActivityQuery = (activityID) => {
    const query = gql`
        query getActivityCall($activityID: String!) {
            activity: getActivity(
                    activityID: $activityID
            ) {
                sheetInfo {
                    activityName
                },
                cardDeck {
                    CardType,
                    Description,
                    CorrectAnswer,
                    Choices,
                    id
                },
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

export default getActivityQuery;