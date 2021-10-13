import gql from "graphql-tag";

const addSheetQuery = (teacherID, sectionID, activityID, cards) => {
    const mutation = gql`
        mutation addSheet(
            $teacherID: String!, 
            $sectionID: String!, 
            $activityID: String!, 
            $cards: [CardInput]
            ) {
                addSheet(
                    sheetInfo: {
                        teacherID: $teacherID,
                        sectionID: $sectionID,
                        activityID: $activityID
                    },
                    cards: $cards
            )
        }`;

    const variables = {
        teacherID, 
        sectionID, 
        activityID, 
        cards: cards.map(card => {
            const {CardType, Description, CorrectAnswer, Choices} = card;
            return {CardType, Description, CorrectAnswer, Choices};
        })
    }

    return {
        mutation,
        variables
    }
};

export default addSheetQuery;