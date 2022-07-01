import axios from "axios";
import authHeader from "../auth/auth-header";

let url = 'http://ip172-18-0-42-cavipdejd6ng0099ljm0-8000.direct.labs.play-with-docker.com';

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