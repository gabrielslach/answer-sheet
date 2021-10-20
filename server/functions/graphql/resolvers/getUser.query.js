const {authHandler, authErrorMsg} = require('./authHandler.util');

const getUser = db => async (_,_req, { authorization }) => {
    try {
        const {isAllowed, userInfo} = await authHandler(db, ['Teacher', 'Student'], authorization.split(' ')[1]);
        console.log(isAllowed, userInfo)
        if (!isAllowed) {
            return null;
        }

        return userInfo;
    } catch (err) {
        console.log('getUser error ', err);
        return null;
    }
};

module.exports = getUser;