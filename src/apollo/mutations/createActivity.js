import gql from "graphql-tag";

const createActivityQuery = (teacherID, sectionID, activityName) => {
    const mutation = gql`
        mutation createActivity(
            $teacherID: String!, 
            $sectionID: String!, 
            $activityName: String!,
            ) {
                createActivity(
                    sheetInfo: {
                        teacherID: $teacherID,
                        sectionID: $sectionID,
                        activityName: $activityName
                    },
            ) {
                id,
                error
            }
        }`;

    const variables = {
        teacherID, 
        sectionID, 
        activityName,
    }

    return {
        mutation,
        variables
    }
};

export default createActivityQuery;