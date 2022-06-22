import axios from "axios";
import authHeader from "../auth/auth-header";


class RessourceService {

    getAll() {
        return axios.get('http://localhost:8000/api/ressources', {headers: authHeader()}
        ).then(
            (response) => {
                return response.data['hydra:member'];
            }
        )
    }

    post(ressource) {
        return axios.post('http://localhost:8000/api/ressources', ressource, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data['hydra:member'];
            }
        )
    }

    put(ressource) {
        return axios.put('http://localhost:8000/api/ressources/' + ressource.id, ressource, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            },
        )
    }
    delete(ressource) {
        return axios.delete('http://localhost:8000/api/ressources/' + ressource.id, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            },
        )
    }


}

export default new RessourceService();