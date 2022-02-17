import { apolloClient } from "../apollo";
import {getActivitiesBySectionQuery, getActivitiesByTeacherQuery} from "../apollo/queries/getActivities";

const sheetsModule = {
    state: () => ({
        sheets:[]
    }),
    mutations: {
        addSheets: (state, sheets) => {
            state.sheets = [
                ...sheets
            ];
        },
    },
    actions: {
        fetchActivitiesBySection: async ({commit}, sectionID) => {
            try {
                commit('setLoading', true);
                const sheetsObj = await apolloClient.query(getActivitiesBySectionQuery(sectionID));
                const { activities } = sheetsObj.data;

                commit("addSheets", activities);
                commit('setLoading', false);
            } catch (error) {
                console.log(error);
                commit('setLoading', false);
            }
        },
        
        fetchActivitiesByTeacher: async ({commit}, teacherID) => {
            try {
                commit('setLoading', true);
                const sheetsObj = await apolloClient.query(getActivitiesByTeacherQuery(teacherID));
                const { activities } = sheetsObj.data;

                commit("addSheets", activities);
                commit('setLoading', false);
            } catch (error) {
                console.log(error);
                commit('setLoading', false);
            }
        }
    },
    getters: {
        getSheets: (state) => state.sheets,
    }
};

export default sheetsModule;