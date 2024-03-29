const appStateModule = {
    state: () => ({
        isLoading: false
    }),
    mutations: {
        setLoading: (state, isLoading) => {
            state.isLoading = isLoading;
            console.log(isLoading);
        }
    },
    actions: {

    },
    getters: {
        isLoadingStatus: (state) => state.isLoading
    }
}

module.exports = appStateModule;