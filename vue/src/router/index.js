import Login from "../components/authentification/Login";
import Calender from "../components/reservation/Calender";
import VueRouter from "vue-router";
import ListRessource from "../components/ressource/ListRessource";

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
    {
        path: '/ressources',
        name: 'Reservation',
        component: ListRessource
    },
]
const router = new VueRouter({
    routes
})

export default router;