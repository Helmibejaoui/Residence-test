import Login from "../components/authentification/Login";
import Calender from "../components/reservation/Calender";
import VueRouter from "vue-router";
import ListRessource from "../components/ressource/ListRessource";
import TodayCheck from "@/components/reservation/TodayCheck";
import Home from "@/components/authentification/Home";

const routes = [
    {
        path: '',
        name: 'Home',
        component: Home
    },
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
    {
        path: '/check',
        name: 'Check',
        component: TodayCheck
    },
]
const router = new VueRouter({
    routes
})

export default router;