import gql from 'graphql-tag';

const getSheetsQuery = (teacherID, sectionID) => {
    const query = gql`
        query sheetsCall($teacherID: String!, $sectionID: String!) {
            sheets: getActivities(
                teacherID: $teacherID,
                sectionID: $sectionID
            )
        }`

    const variables = {
        sectionID,
        teacherID
    };

    return {
        query,
        variables
    }
};

export default getSheetsQuery;