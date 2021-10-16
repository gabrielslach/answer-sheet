import gql from 'graphql-tag';

const getTeachersQuery = () => {
    const query = gql`
        query {
            teachers:getTeachers
            }`

    return {
        query
    }
};

export default getTeachersQuery;