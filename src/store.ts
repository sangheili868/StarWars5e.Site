import Vue from 'vue'
import Vuex from 'vuex'
import azure from 'azure-storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classes: []
  },
  mutations: {
    setClasses (state, classes) {
      state.classes = classes
    }
  },
  actions: {
    fetchClasses ({ commit }) {
      const sas = process.env.tablestoragesas || ''
      const uri = process.env.tablestorageurl || ''
      const tableService = azure.createTableServiceWithSas(uri, sas)
      const tableQuery = new azure.TableQuery().top(200)
      ;(tableService as any).queryEntities('classes', tableQuery, null, (error: Error, results: any) => {
        if (!error) {
          commit('setClasses', results.entries.map(({ Name }: any) => Name._))
        }
      })
    }

  }
})
