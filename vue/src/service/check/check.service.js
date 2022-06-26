import axios from "axios";
import authHeader from "../auth/auth-header";


class CheckService {

    getCheck() {
        return axios.get('http://localhost:8000/api/checks', {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            }
        )
    }




}

export default new CheckService();