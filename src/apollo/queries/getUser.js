import gql from 'graphql-tag';

const getUserQuery = (userUID, forceFreshFetch) => {
    const query = gql`
        query getUserInfo($userUID: String!) {
            userInfo: getUser(userUID: $userUID) {
                uid,
                name,
                email,
                userType,
                teacherID,
                sectionID
                }
            }`;

    const variables = {
        userUID
    }

    return {
        query,
        variables,
        fetchPolicy: forceFreshFetch ? "network-only": "cache-first"
    }
};

export default getUserQuery;