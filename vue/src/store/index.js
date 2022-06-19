import {auth} from "./auth.module"
import {reservation} from "./reservation.module"
import {ressource} from "./ressource.module"
import Vue from 'vue'
import Vuex from 'vuex'
import {createModule} from 'vuex-toast'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        reservation,
        ressource,
        toast: createModule({
            dismissInterval: 8000
        })
    }
})
