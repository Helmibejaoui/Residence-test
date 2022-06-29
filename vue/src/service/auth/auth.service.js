import axios from "axios";

let url = 'http://ip172-18-0-36-cau5uf433d5g00cl7bkg-8000.direct.labs.play-with-docker.com';

class AuthService {


    login(user) {
        return axios.post(url+'/api/authentication_token', {
                email: user.email,
                password: user.password
            }
        ).then(
            (response) => {
                if (response.data.token) {
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                }
                return response.data.token;
            }
        )
    }

    logout() {
        return axios.get(url+'/api'
        ).then(
            (response) => {
                localStorage.removeItem('token');
                return response.data;
            }
        )

    }
}

export default new AuthService();