import axios from "axios";
import authHeader from "../auth/auth-header";

let url = process.env.VUE_APP_API;

class ReservationService {

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
        return axios.get(url + '/api/reservations' + (queryString ? '?' + queryString : ''), {headers: authHeader()}
        ).then(
            (response) => {
                return response.data['hydra:member'];
            }
        )
    }

    getById(id) {
        return axios.get(url + '/api/reservations/' + id, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            },
        )
    }

    post(reservation) {
        return axios.post(url + '/api/reservations', reservation, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            },
        )
    }

    put(reservation) {
        return axios.put(url + '/api/reservations/' + reservation.id, reservation, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            },
        )
    }


}

export default new ReservationService();