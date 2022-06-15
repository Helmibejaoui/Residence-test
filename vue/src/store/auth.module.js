import AuthService from '../service/auth/auth.service'

const token = JSON.parse(localStorage.getItem('token'));
const initialState = token ? {status: {loggedIn: true}, token} : {status: {loggedIn: false}, user: null, error: null};

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit}, user) {
            return AuthService.login(user).then(
                (token) => {
                    commit('loginSuccess', token);
                    return Promise.resolve(token);
                },
                (error) => {
                    commit('loginFailure', error.response.data.error_description);
                    return Promise.reject(error);
                }
            )
        },
        logout({commit}) {
            return AuthService.logout().then(
                (response) => {
                    commit('logout');
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

        },
        refresh({commit}) {
            return AuthService.refresh().then(
                (response) => {
                    commit('refresh', token);
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

        }
    },
    mutations: {
        loginSuccess(state, token) {
            state.status.loggedIn = true;
            state.token = token;
        },
        loginFailure(state, error) {
            state.status.loggedIn = false;
            state.token = null;
            state.error = error;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.token = null;
        },
        refresh(state) {
            state.status.loggedIn = true;
            state.token = token;
        },

    }
}