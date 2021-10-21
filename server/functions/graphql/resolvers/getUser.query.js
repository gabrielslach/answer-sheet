const {authHandler, authErrorMsg} = require('./authHandler.util');

const getUser = db => async (_,{userUID}, { authorization }) => {
    try {
        const {isAllowed, userInfo} = await authHandler(db, ['Teacher', 'Student'], authorization.split(' ')[1]);
        
        if (!isAllowed || userInfo.uid !== userUID) {
            return null;
        }

        return userInfo;
    } catch (err) {
        console.log('getUser error ', err);
        return null;
    }
};

module.exports = getUser;