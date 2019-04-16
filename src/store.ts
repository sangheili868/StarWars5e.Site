import Vue from 'vue'
import Vuex from 'vuex'
import { CharacterClass, RootState } from './types'
import axios from 'axios'
import _ from 'lodash'

Vue.use(Vuex)

const fetchFromAPI = (endpoint: string) => {
  return axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/${endpoint}`)
}

export default new Vuex.Store<RootState>({
  state: {
    classes: [],
    credits: []
  },

  mutations: {
    setClasses (state, classes: CharacterClass[]) {
      state.classes = classes
    },

    setCredits (state, credits: String[]) {
      state.credits = credits
    }
  },
  actions: {
    fetchClasses ({ commit }) {
      fetchFromAPI('Class').then((results: any) => {
        commit('setClasses', results.data)
      })
    },

    fetchCredits ({ commit }) {
      fetchFromAPI('Credit').then((results: any) => {
        commit('setCredits', _(results.data)
          .filter((credit: any) => credit.partitionKey === 'Credit')
          .map('rowKey')
        )
      })
    }
  }
})
