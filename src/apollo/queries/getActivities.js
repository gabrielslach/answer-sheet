import gql from 'graphql-tag';

export const getActivitiesBySectionQuery = (sectionID) => {
    const query = gql`
        query getActivitiesBySectionQuery($sectionID: String!) {
            activities: getActivitiesBySectionID(
                sectionID: $sectionID
            ) {
                activityID,
                activityName,
                teacherName,
                sectionName
                submissions {
                    submissionID
                },
                deadlineDate
            }
        }`

    const variables = {
        sectionID,
    };

    return {
        query,
        variables
    }
};

export const getActivitiesByTeacherQuery = (teacherID, forceFreshFetch) => {
    const query = gql`
        query getActivitiesByTeacherQuery($teacherID: String!) {
            activities: getActivitiesByTeacherID(
                teacherID: $teacherID
            ) {
                activityID,
                activityName,
                teacherName,
                sectionName
                submissions {
                    submissionID
                },
                deadlineDate
            }
        }`

    const variables = {
        teacherID,
    };

    return {
        query,
        variables,
        fetchPolicy: forceFreshFetch ? "network-only": "cache-first"
    }
};