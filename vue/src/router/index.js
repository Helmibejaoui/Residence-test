import Login from "../components/authentification/Login";
import VueRouter from "vue-router";

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
]
const router = new VueRouter({
    routes
})

export default router;