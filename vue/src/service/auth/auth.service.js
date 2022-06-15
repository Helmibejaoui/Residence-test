import axios from "axios";


class AuthService {

    login(user) {
        return axios.post('http://localhost:8000/api/authentication_token', {
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
        return axios.get('http://localhost:8000/api'
        ).then(
            (response) => {
                localStorage.removeItem('token');
                return response.data;
            }
        )

    }
}

export default new AuthService();