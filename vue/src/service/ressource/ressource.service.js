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


}

export default new RessourceService();