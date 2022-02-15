import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { apolloClient } from "../apollo";
import addUserQuery from "../apollo/mutations/addUser";
import getSectionsQuery from "../apollo/queries/getSections";
import getTeachersQuery from "../apollo/queries/getTeachers";
import getUserQuery from "../apollo/queries/getUser";

import router from "../router";

const _userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

const answersModule = {
    state: () => ({
        userInfo:{
            uid: _userInfo.uid || '',
            name: _userInfo.name || '',
            email: _userInfo.email || '',
            userType: _userInfo.userType || '',
            teacherID: _userInfo.teacherID || '',
            sectionID: _userInfo.sectionID || ''
        },
        teachers: [],
        sections: [],
        authToken: localStorage.getItem('authToken') || '',
    }),
    mutations: {
        setUserInfo: (state, userInfo) => {
            for (let key of Object.keys(state.userInfo)) {
                if (userInfo[key]) {
                    state.userInfo[key] = userInfo[key];
                    }
            }
        },
        clearUserInfo: (state) => {
            for (let key of Object.keys(state.userInfo)) {
                state.userInfo[key] = '';
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
        }
    },
    actions: {
        addUserToDB: async ({commit, dispatch, state}, {name, teacher, section}) => {
            try {
                const userInfo = state.userInfo || {};
                commit('setLoading', true);
                await apolloClient.mutate(addUserQuery(name, userInfo.uid, teacher, section));
                dispatch('fetchUserInfo', {uid: userInfo.uid, forceFreshFetch: true});
            } catch (error) {
                alert('Saving user record failed, please dont close the window and try again.');
            }

            commit('setLoading', false);
        },
        login: async ({commit, dispatch}, {email, password}) => {
            commit('setLoading', true);
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then(userObj => {
                    dispatch('fetchUserInfo', {uid: userObj.user.uid});
                }).catch( err => {
                    console.log('Auth error', err);
                    commit('setLoading', false);
                })
        },
        logout: async ({commit}) => {
            const auth = getAuth();
            try {
                await signOut(auth);
                commit('clearUserInfo');

                localStorage.removeItem('authToken');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('userType');
                
                router.push({
                    name:'auth',
                    replace: true
                });
            } catch (error) {
                console.log('Signout error.')
            }
        },
        setAuthToken: async ({commit}, authToken) => {
            commit('setAuthToken', authToken);
            if (authToken) {
                localStorage.setItem('authToken', authToken);
            } else {
                localStorage.removeItem('authToken');
            }
            
        },
        fetchTeachers: async ({commit}) => {
            commit('setLoading', true);
            const { data } = await apolloClient.query(getTeachersQuery());
            const { teachers } = data;

            commit("setTeachers", teachers.map(o => ({label: o.teacherName, value: o.teacherID})));
            commit('setLoading', false);
        },
        fetchSections: async ({commit}, teacherID) => {
            commit('setLoading', true);
            if (!teacherID || teacherID.length < 1) {
                return commit("setSections", []);
            }
            const { data } = await apolloClient.query(getSectionsQuery(teacherID));
            const { sections } = data;

            commit("setSections", sections.map(o => ({label: o.sectionName, value: o.sectionID})));
            commit('setLoading', false);
        },
        fetchUserInfo: async ({commit}, {uid, forceFreshFetch}) => {
            commit('setLoading', true);

            const { data } = await apolloClient.query(getUserQuery(uid, forceFreshFetch));
            const { userInfo } = data;

            if (!userInfo) {
                localStorage.setItem('userInfo', JSON.stringify({uid}));
                commit('setUserInfo', {uid});
                router.push({
                    name:'register',
                    replace: true
                });
                return;
            }
            
            const routeNameEnum = {
                Student: 'studentDashboard',
                Teacher: 'teacherDashboard'
            };

            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            
            router.push({
                name:routeNameEnum[userInfo.userType],
                replace: true
            });

            commit('setUserInfo', userInfo);
            commit('setLoading', false);
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