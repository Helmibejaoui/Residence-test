import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from "./store"
//import execute from "./helpers/httpInterceptor";
import router from "./router"
import vuetify from './plugins/vuetify'
import 'vuex-toast/dist/vuex-toast.css'
import VueI18n from 'vue-i18n'
import {local} from "@/local";


Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);

const messages = local;

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'fr', // set locale
    messages, // set locale messages
})

new Vue({
    store,
    router,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount('#app')