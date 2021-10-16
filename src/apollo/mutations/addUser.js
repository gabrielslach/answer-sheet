import gql from "graphql-tag";

const addUserQuery = (name, uid, teacherID, sectionID) => {
    const mutation = gql`
        mutation addUser(
            $teacherID: String, 
            $sectionID: String, 
            $name: String!, 
            $uid: String!
            ) {
                addUser(
                    userInfo: {
                        teacherID: $teacherID,
                        sectionID: $sectionID,
                        name: $name,
                        uid: $uid
                    }
            )
        }`;

    const variables = {
        teacherID, 
        sectionID, 
        name,
        uid
    }

    return {
        mutation,
        variables
    }
};

export default addUserQuery;