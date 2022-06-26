import CheckService from '../service/check/check.service';

const initialState = {
    check: '',
    loading: false,
    loadingStorage: false,
    error: null,


}

export const check = {
    namespaced: true,
    state: initialState,
    actions: {
        getCheck({commit}) {
            commit('loadingStatus', true);
            return CheckService.getCheck().then(
                (response) => {
                    commit('getCheckSuccess', response);
                    commit('loadingStatus', true);
                    return Promise.resolve(response);
                },
                (error) => {
                    commit('getCheckFailure', error.response.data);
                    commit('loadingStatus', false);
                    return Promise.reject(error);
                }
            )
        },


    },
    mutations: {
        loadingStatus(state, status) {
            state.loading = status;
        },
        getCheckSuccess(state, response) {
            state.check = response;
        },
        getCheckFailure(state, error) {
            state.error = error;
        },
    }
}