import { apolloClient } from "../apollo";
import getSectionsQuery from "../apollo/queries/getSections";
import getSheetsQuery from "../apollo/queries/getSheets";

const sheetsModule = {
    state: () => ({
        sheets:[]
    }),
    mutations: {
        addSheets: (state, sheets) => {
            state.sheets = [
                ...state.sheets,
                ...sheets
            ];
        },
    },
    actions: {
        fetchSheets: async ({commit}, teacherID) => {
            try {
                const sectionsObj = await apolloClient.query(getSectionsQuery(teacherID));
                sectionsObj.data.sections.forEach(async(sectionID) => {
                    const sheetsObj = await apolloClient.query(getSheetsQuery(teacherID, sectionID));
                    const { sheets } = sheetsObj.data;
                    const parsedSheetList = sheets.map( sheetID => ({sectionID, sheetID}))
                    
                    commit("addSheets", parsedSheetList);
                });
            } catch (error) {
                console.log(error);
            }
        }
    },
    getters: {
        getSheets: (state) => state.sheets,
    }
};

export default sheetsModule;