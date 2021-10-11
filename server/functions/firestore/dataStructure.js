const users = {
    userID: {
        name: '',
        userType: '',
        section: '',
        userID: ''
    }
};

const teachers = {
    teacherID: {
        sections: {
            sectionID: {
                activities: {
                    activityID: {
                        cards: [],
                        submissions: {
                            submissionID: {
                                studentID: '',
                                timestamp: new Date(),
                                answers: []
                            }
                        }
                    }
                }
            }
        }
    }
}