import { apolloClient } from "../apollo";
import addSubmissionQuery from "../apollo/mutations/addSubmission";

const answersModule = {
    state: () => ({
        student:{
            id: '',
            name: '',
            section: ''
        },
        answers:{}
    }),
    mutations: {
        upsertStudent: (state, info) => {
            for (let key in Object.keys(state)) {
                if (info[key]) {
                    state.student[key] = info[key];
                    }
            }
        },
        upsertAnswer: (state, {questionID, answer}) => {
            state.answers[questionID] = answer;
        }
    },
    actions: {
        upsertStudent: ({commit}, {key, val}) => {
            console.log('upsertStudent', {}[key] = val);
            commit('upsertStudent', {}[key] = val);
        },
        upsertAnswer: ({commit}, {questionID, answer}) => {
            console.log('upsertAnswer', {questionID, answer});
            commit('upsertAnswer', {questionID, answer});
        },
        submitAnswers: async ({state, rootState, commit}, {teacherID, sectionID, activityID}) => {
            commit('setLoading', true);

            try {
                const userID = rootState.user.userInfo.uid;
                const parsedAnswers = Object.entries(state.answers).map(([questionID, answer]) => ({
                    questionID,
                    answer
                }));
                await apolloClient.mutate(addSubmissionQuery(
                    userID, 
                    teacherID,
                    sectionID,
                    activityID,
                    parsedAnswers
                    ));
                alert('Your answers are submitted successfully.')
                window.close();
            } catch (error) {
                alert('Submission failed, please try again later.')
            }
            
            commit('setLoading', false);
        }
    },
    getters: {

    }
};

export default answersModule;