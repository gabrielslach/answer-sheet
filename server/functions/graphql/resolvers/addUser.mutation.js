const addUser = db => async (_, {userInfo}) => {
    try {
        console.log('ey')
        const userObj = {
            name: userInfo.name,
            userType: userInfo.userType,
            section: userInfo.section,
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