import axios from "axios";
import authHeader from "../auth/auth-header";

let url = 'http://ip172-18-0-36-cau5uf433d5g00cl7bkg-8000.direct.labs.play-with-docker.com';

class RessourceService {

    getAll() {
        return axios.get(url + '/api/ressources', {headers: authHeader()}
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