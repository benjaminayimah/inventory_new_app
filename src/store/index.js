import Vuex from 'vuex'
import Vue from 'vue'
import data from './modules/data'

//load vuex
Vue.use(Vuex);

//create store
export default new Vuex.Store({
    modules: {
        data
    }
})
