const addUser = db => async (_, {userInfo}) => {
    try {
        console.log('ey')
        const userObj = {
            name: userInfo.name,
            userType: userInfo.userType,
            section: userInfo.section
        }
        const userRef = db.collection('users').doc();

        userObj.id = userRef.id;

        const addUserResp = await userRef.set(userObj)
        
        return JSON.stringify(addUserResp);
    } catch (err) {
        return JSON.stringify(err);
    }
};

module.exports = addUser;