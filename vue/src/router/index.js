import Login from "../components/authentification/Login";
import Calender from "../components/reservation/Calender";
import VueRouter from "vue-router";

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/reservation',
        name: 'Reservation',
        component: Calender
    },
]
const router = new VueRouter({
    routes
})

export default router;