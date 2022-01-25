const firebase = require('firebase-admin');

const authHandler = async (db, authLvls = [], authToken) => {

    if (authLvls.length === 0) {
        return {isAllowed: true, userInfo: {}}
    }

    try {
        const { uid, email } = await decodeToken(authToken);
        
        const snapshot = await db.collection('users').doc(uid).get();
        
        let isAllowed = false;

        const userInfo = snapshot.data();
        
        if (!userInfo) {
            return {isAllowed, userInfo: {}}
        }

        const { userType } = userInfo;

        for (let i in authLvls) {
            console.log(authLvls[i], '=', userType)
            if (authLvls[i] === userType) {
                isAllowed = true;
                break;
            }
        }

        userInfo.email = email;

        return {isAllowed, userInfo};
    } catch (error) {
        console.log('authHandler Error', error);
        return {isAllowed: false}
    }
    
};

const authErrorMsg = "Oops, you're not allowed to do this :P";

const decodeToken = async (authToken) => {
    try {
        const decodedToken = await firebase.auth().verifyIdToken(authToken);
        const { uid, email } = decodedToken;
        
        return Promise.resolve({ uid, email });
    } catch (error) {
        console.log('auth error', error)
        return Promise.reject(error);
    }
}


module.exports = {
    authHandler,
    authErrorMsg,
    decodeToken
};