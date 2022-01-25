import gql from "graphql-tag";

const createSheetQuery = (teacherID, sectionName, activityName) => {
    const mutation = gql`
        mutation createSheet(
            $teacherID: String!, 
            $sectionName: String!, 
            $activityName: String!,
            ) {
                addSheet(
                    sheetInfo: {
                        teacherID: $teacherID,
                        sectionName: $sectionName,
                        activityName: $activityName
                    },
            )
        }`;

    const variables = {
        teacherID, 
        sectionName, 
        activityName,
    }

    return {
        mutation,
        variables
    }
};

export default createSheetQuery;