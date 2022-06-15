import {auth} from "./auth.module"
import Vue from 'vue'
import Vuex from 'vuex'
import {createModule} from 'vuex-toast'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        toast: createModule({
            dismissInterval: 8000
        })
    }
})
