import axios from "axios";
import authHeader from "../auth/auth-header";


class ReservationService {

    getAll() {
        return axios.get('http://localhost:8000/api/reservations', {headers: authHeader()}
        ).then(
            (response) => {
                return response.data['hydra:member'];
            }
        )
    }

    getById(id) {
        return axios.get('http://localhost:8000/api/reservations/' + id, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            },
        )
    }

    post(reservation) {
        return axios.post('http://localhost:8000/api/reservations', reservation, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            },
        )
    }

    put(reservation) {
        return axios.put('http://localhost:8000/api/reservations/' + reservation.id, reservation, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            },
        )
    }



}

export default new ReservationService();