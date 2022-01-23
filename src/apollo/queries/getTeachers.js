import gql from 'graphql-tag';

const getTeachersQuery = () => {
    const query = gql`
        query {
            teachers:getTeachers{
                teacherID,
                teacherName
            }
            }`

    return {
        query
    }
};

export default getTeachersQuery;