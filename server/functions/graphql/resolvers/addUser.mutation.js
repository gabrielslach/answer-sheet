const addUser = db => async (_, {userInfo}) => {
    try {
        const userObj = {
            name: userInfo.name,
            userType: 'Student',
            teacherID: userInfo.teacherID,
            sectionID: userInfo.sectionID,
            uid: userInfo.uid
        }
        const userRef = db.collection('users').doc(userInfo.uid);

        const addUserResp = await userRef.set(userObj)
        
        return JSON.stringify(addUserResp);
    } catch (err) {
        return JSON.stringify(err);
    }
};

module.exports = addUser;