import axios from 'axios';
import router from "../router";


export default function execute() {
    axios.interceptors.response.use(function (response) {
        return response
    }, async function (error) {
        if (error.response.status === 401) {
            await router.push('/login');

        }
        return Promise.reject(error)
    })
}