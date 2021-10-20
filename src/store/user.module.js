import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { apolloClient } from "../apollo";
import addUserQuery from "../apollo/mutations/addUser";
import getSectionsQuery from "../apollo/queries/getSections";
import getTeachersQuery from "../apollo/queries/getTeachers";
import getUserQuery from "../apollo/queries/getUser";

const answersModule = {
    state: () => ({
        userInfo:{
            uid: '',
            name: '',
            email: '',
            userType: localStorage.getItem('userType') || '',
            teacherID: '',
            sectionID: ''
        },
        teachers: [],
        sections: [],
        authToken: localStorage.getItem('authToken') || '',
        isLoading: false
    }),
    mutations: {
        setUserInfo: (state, userInfo) => {
            for (let key of Object.keys(state.userInfo)) {
                if (userInfo[key]) {
                    state.userInfo[key] = userInfo[key];
                    }
            }
        },
        setAuthToken: (state, authToken) => {
            state.authToken = authToken;
        },
        setTeachers: (state, teachers) => {
            state.teachers = teachers;
        },
        setSections: (state, sections) => {
            state.sections = sections;
        },
        setLoading: (state, isLoading) => {
            state.isLoading = isLoading;
        }
    },
    actions: {
        addUserToAuth: async ({commit, dispatch}, {email, password, name, teacher, section}) => {
            try {
                commit('setLoading', true);
                const auth = getAuth();
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

                commit('setUserInfo', {uid: userCredentials.user.uid});
                commit('setLoading', false);
                dispatch('addUserToDB', {uid: userCredentials.user.uid, name, teacher, section});
            } catch (error) {
                alert(JSON.stringify(error));
                commit('setLoading', false);
            }
        },
        addUserToDB: async ({commit}, {uid, name, teacher, section}) => {
            try {
                commit('setLoading', true);
                const dbResp = await apolloClient.mutate(addUserQuery(name, uid, teacher, section));
                alert(JSON.stringify(dbResp));
                commit('setLoading', false);
            } catch (error) {
                alert(JSON.stringify(error));
                commit('setLoading', false);
            }
        },
        login: async ({commit, dispatch}, {email, password}) => {
            commit('setLoading', true);
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    dispatch('fetchUserInfo');
                }).catch( err => {
                    console.log('Auth error', err);
                }).finally(()=>{
                    commit('setLoading', false);
                })

            const userInfo = {};
                
            commit('setUserInfo', userInfo);
        },
        logout: async () => {
            const auth = getAuth();
            try {
                await signOut(auth);
                localStorage.removeItem('authToken');
                localStorage.removeItem('userType');
            } catch (error) {
                console.log('Signout error.')
            }
        },
        setAuthToken: async ({commit}, authToken) => {
            commit('setAuthToken', authToken);
            localStorage.setItem('authToken', authToken);
        },
        fetchTeachers: async ({commit}) => {
            const { data } = await apolloClient.query(getTeachersQuery());
            const { teachers } = data;

            commit("setTeachers", teachers);
        },
        fetchSections: async ({commit}, teacherID) => {
            if (!teacherID || teacherID.length < 1) {
                return commit("setSections", []);
            }
            const { data } = await apolloClient.query(getSectionsQuery(teacherID));
            const { sections } = data;

            commit("setSections", sections);
        },
        fetchUserInfo: async ({commit}) => {
            const { data } = await apolloClient.query(getUserQuery());
            const { userInfo } = data;

            localStorage.setItem('userType', userInfo.userType);
            commit('setUserInfo', userInfo);
        }
    },
    getters: {
        getUser: (state) => state.userInfo,
        getAuthToken: state => state.authToken,
        getTeachers: state => state.teachers,
        getSections: state => state.sections
    }
};

export default answersModule;