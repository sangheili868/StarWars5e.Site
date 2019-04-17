import Vue from 'vue'
import Vuex from 'vuex'
import credits from './modules/credits'
import classes from './modules/classes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    credits,
    classes
  }
})
