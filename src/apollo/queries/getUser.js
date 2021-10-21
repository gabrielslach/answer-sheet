import gql from 'graphql-tag';

const getUserQuery = (userUID) => {
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
        variables
    }
};

export default getUserQuery;