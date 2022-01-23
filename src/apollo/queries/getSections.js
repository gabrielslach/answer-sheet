import gql from 'graphql-tag';

const getSectionsQuery = (teacherID) => {
    const query = gql`
        query getSectionsCall($teacherID: String!) {
            sections: getSections(teacherID: $teacherID){
                sectionName,
                sectionID
            }
        }`

    const variables = {
        teacherID
    };

    return {
        query,
        variables
    }
};

export default getSectionsQuery;