import Vue from 'vue'
import Vuex from 'vuex'
import credits from './modules/credits'
import classes from './modules/classes'
import deployments from './modules/deployments'
import species from './modules/species'
import powers from './modules/powers'
import blobs from './modules/blobs'
import ui from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    credits,
    classes,
    deployments,
    species,
    blobs,
    powers,
    ui
  }
})
