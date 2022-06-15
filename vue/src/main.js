import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from "./store";
//import execute from "./helpers/httpInterceptor";
import router from "./router";
import vuetify from './plugins/vuetify'
import 'vuex-toast/dist/vuex-toast.css'



Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
 store,
 router,
 vuetify,
 render: h => h(App)
}).$mount('#app')