import axios from "axios";
import authHeader from "../auth/auth-header";

let url = 'http://ip172-18-0-36-cau5uf433d5g00cl7bkg-8000.direct.labs.play-with-docker.com';

class ReservationService {

    getAll(filter) {
        return axios.get(url+'/api/reservations' + (filter ? '?startAt=' + filter.date + '&status=' + filter.status : ''), {headers: authHeader()}
        ).then(
            (response) => {
                return response.data['hydra:member'];
            }
        )
    }

    getById(id) {
        return axios.get(url+'/api/reservations/' + id, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            },
        )
    }

    post(reservation) {
        return axios.post(url+'/api/reservations', reservation, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            },
        )
    }

    put(reservation) {
        return axios.put(url+'/api/reservations/' + reservation.id, reservation, {headers: authHeader()}
        ).then(
            (response) => {
                return response.data;
            },
        )
    }


}

export default new ReservationService();