import axios from "axios";
import authHeader from "../auth/auth-header";

let url = process.env.VUE_APP_API;

class RessourceService {

    getAll(filter) {
        let queryString = Object.keys(filter).map(key => {
                let str = '';
                if (Array.isArray(filter[key])) {
                    str += filter[key].map(value =>
                        key + '[]' + '=' + value).join('&')
                } else {
                    str += key + '=' + filter[key]
                }
                return str
            }
        ).join('&');
        return axios.get(url + '/api/ressources' + (queryString ? '?' + queryString : ''), {headers: authHeader()}
        ).then(
            (response) => {
                return response.data['hydra:member'];
            }
        )
    }

    post(ressource) {
        return axios.post(url + '/api/ressources', ressource, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data['hydra:member'];
            }
        )
    }

    put(ressource) {
        return axios.put(url + '/api/ressources/' + ressource.id, ressource, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            },
        )
    }

    delete(ressource) {
        return axios.delete(url + '/api/ressources/' + ressource.id, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            },
        )
    }


}

export default new RessourceService();