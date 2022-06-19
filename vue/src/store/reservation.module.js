import ReservationService from '../service/reservation/reservation.service'

const initialState = {
    reservations: [],
    loading: false,
    loadingStorage: false,
    error: null,
    reservation: {}


}

export const reservation = {
    namespaced: true,
    state: initialState,
    actions: {
        getAll({commit}) {
            commit('loadingStatus', true);
            return ReservationService.getAll().then(
                (response) => {
                    commit('getReservationsSuccess', response);
                    commit('loadingStatus', true);
                    return Promise.resolve(response);
                },
                (error) => {
                    commit('getReservationsFailure', error.response.data);
                    commit('loadingStatus', false);
                    return Promise.reject(error);
                }
            )
        },
        post({commit}, reservation) {
            commit('loadingStatus', true);
            return ReservationService.post(reservation).then(
                (response) => {
                    commit('loadingStatus', true);
                    return Promise.resolve(response);
                },
                (error) => {
                    commit('postReservationsFailure', error.response.data);
                    commit('loadingStatus', false);
                    return Promise.reject(error);
                }
            )
        },
        put({commit}, reservation) {
            commit('loadingStatus', true);
            return ReservationService.put(reservation).then(
                (response) => {
                    commit('loadingStatus', true);
                    return Promise.resolve(response);
                },
                (error) => {
                    commit('putReservationsFailure', error.response.data);
                    commit('loadingStatus', false);
                    return Promise.reject(error);
                }
            )
        },
        getById({commit}, id) {
            commit('loadingStatus', true);
            return ReservationService.getById(id).then(
                (response) => {
                    commit('getReservationSuccess', response);
                    commit('loadingStatus', true);
                    return Promise.resolve(response);
                },
                (error) => {
                    commit('getReservationFailure', error.response.data);
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
        getReservationsSuccess(state, response) {
            state.reservations = response;
        },
        getReservationsFailure(state, error) {
            state.error = error;
        },
        postReservationsFailure(state, error) {
            state.error = error;
        },
        getReservationSuccess(state, response) {
            state.reservation = response;
        },
        getReservationFailure(state, error) {
            state.error = error;
        },
        putReservationsFailure(state, error) {
            state.error = error;
        },
    }
}