import RessourceService from '../service/ressource/ressource.service'

const initialState = {
    ressources: [],
    loading: false,
    loadingStorage: false,
    error: null,


}

export const ressource = {
    namespaced: true,
    state: initialState,
    actions: {
        getAll({commit}) {
            commit('loadingStatus', true);
            return RessourceService.getAll().then(
                (response) => {
                    commit('getRessourcesSuccess', response);
                    commit('loadingStatus', true);
                    return Promise.resolve(response);
                },
                (error) => {
                    commit('getRessourcesFailure', error.response.data);
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
        getRessourcesSuccess(state, response) {
            state.ressources = response;
        },
        getRessourcesFailure(state, error) {
            state.error = error;
        },
    }
}