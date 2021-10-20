import gql from 'graphql-tag';

const getUserQuery = () => {
    const query = gql`
        query {
            userInfo: getUser {
                uid,
                name,
                email,
                userType,
                teacherID,
                sectionID
                }
            }`

    return {
        query
    }
};

export default getUserQuery;