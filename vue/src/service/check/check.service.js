import axios from "axios";
import authHeader from "../auth/auth-header";

let url = 'http://localhost:8000';

class CheckService {

    getCheck() {
        return axios.get(url + '/api/checks', {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            }
        )
    }


}

export default new CheckService();