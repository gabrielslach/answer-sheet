import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const answersModule = {
    state: () => ({
        userInfo:{
            id: '',
            name: '',
            userType: '',
            section: ''
        },
        authToken: localStorage.getItem('authToken') || ''
    }),
    mutations: {
        setUserInfo: (state, userInfo) => {
            console.log(userInfo)
            for (let key of Object.keys(state.userInfo)) {
                if (userInfo[key]) {
                    state.userInfo[key] = userInfo[key];
                    }
            }
        },
        setAuthToken: (state, authToken) => {
            state.authToken = authToken;
        }
    },
    actions: {
        login: async ({commit}, {email, password}) => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((data) => {
                    console.log(data);
                }).catch( err => {
                    console.log('Auth error', err);
                })
                
            const userInfo = {
                id: '11322',
                name: 'Drix Lopez',
                userType: 'student',
                section: 'BTC',
                authToken: '123213'
            };
            commit('setUserInfo', userInfo);
        },
        logout: async () => {
            const auth = getAuth();
            try {
                await signOut(auth);
                localStorage.removeItem('authToken');
            } catch (error) {
                console.log('Signout error.')
            }
        },
        setAuthToken: async ({commit}, authToken) => {
            commit('setAuthToken', authToken);
            localStorage.setItem('authToken', authToken);
        }
    },
    getters: {
        getUser: (state) => state.userInfo,
        getAuthToken: state => state.authToken
    }
};

export default answersModule;