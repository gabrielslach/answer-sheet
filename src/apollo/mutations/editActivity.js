import gql from "graphql-tag";

const editActivityQuery = (docID, cards) => {
    const mutation = gql`
        mutation editActivity(
            $docID: String!,
            $cards: [CardInput]
            ) {
                editActivity(
                    docID: $docID,
                    documentObj: {
                        cards: $cards
                    }
            ) {
                id,
                error
            }
        }`;

    const variables = {
        docID,
        cards
    }

    return {
        mutation,
        variables
    }
};

export default editActivityQuery;