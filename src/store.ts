import Vue from 'vue'
import Vuex from 'vuex'
import credits from './modules/credits'
import classes from './modules/classes'
import species from './modules/species'
import powers from './modules/powers'
import handbookBlobs from './modules/blobs'
import starshipBlobs from './modules/blobs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    credits,
    classes,
    species,
    handbookBlobs,
    starshipBlobs,
    powers
  }
})
