const answersModule = {
    state: () => ({
        userInfo:{
            id: '',
            name: '',
            userType: '',
            section: '',
            authToken: ''
        }
    }),
    mutations: {
        setUserInfo: (state, userInfo) => {
            console.log(userInfo)
            for (let key of Object.keys(state.userInfo)) {
                if (userInfo[key]) {
                    state.userInfo[key] = userInfo[key];
                    }
            }
        }
    },
    actions: {
        login: async ({commit}, {username, password}) => {
            //POST with username and password
            console.log('POST with', username, password);
            //backend will return these details
            const userInfo = {
                id: '11322',
                name: 'Drix Lopez',
                userType: 'student',
                section: 'BTC',
                authToken: '123213'
            };
            commit('setUserInfo', userInfo);
        },
    },
    getters: {
        getUser: (state) => state.userInfo
    }
};

export default answersModule;