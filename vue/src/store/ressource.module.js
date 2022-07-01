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
        getAll({commit},filter) {
            commit('loadingStatus', true);
            return RessourceService.getAll(filter).then(
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
        post({commit}, ressource) {
            commit('loadingStatus', true);
            return RessourceService.post(ressource).then(
                (response) => {
                    commit('loadingStatus', true);
                    return Promise.resolve(response);
                },
                (error) => {
                    commit('postRessourcesFailure', error.response.data);
                    commit('loadingStatus', false);
                    return Promise.reject(error);
                }
            )
        },
        put({commit}, ressource) {
            commit('loadingStatus', true);
            return RessourceService.put(ressource).then(
                (response) => {
                    commit('loadingStatus', true);
                    return Promise.resolve(response);
                },
                (error) => {
                    commit('putRessourcesFailure', error.response.data);
                    commit('loadingStatus', false);
                    return Promise.reject(error);
                }
            )
        },
        delete({commit}, ressource) {
            commit('loadingStatus', true);
            return RessourceService.delete(ressource).then(
                (response) => {
                    commit('loadingStatus', true);
                    return Promise.resolve(response);
                },
                (error) => {
                    commit('deleteRessourcesFailure', error.response.data);
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
        postRessourcesFailure(state, error) {
            state.error = error;
        },
        putRessourcesFailure(state, error) {
            state.error = error;
        },
        deleteRessourcesFailure(state, error) {
            state.error = error;
        },
    }
}