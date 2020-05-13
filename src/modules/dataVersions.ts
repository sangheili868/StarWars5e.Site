import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { DataVersionType } from '@/types/utilityTypes'

@Module({ namespaced: true, name: 'dataVersions' })
export default class DataVersions extends VuexModule {
  dataVersions: DataVersionType[] = []
  dataVersionTimeout: Date | null = null
  hasInternet = true

  @MutationAction({ mutate: ['dataVersions', 'dataVersionTimeout', 'hasInternet'] })
  async fetchDataVersions () {
    let dataVersions = []
    let dataVersionTimeout = new Date()
    let hasInternet = true
    console.log('Fetching data versions from database')
    try {
      dataVersions = (await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/dataVersion`)).data
      dataVersionTimeout.setDate(dataVersionTimeout.getDate() + 3)
    } catch (e) {
      hasInternet = false
    }
    return { dataVersions, dataVersionTimeout, hasInternet }
  }

  @MutationAction({ mutate: ['hasInternet'] })
  async setNoInternet () {
    return { hasInternet: false }
  }

  @MutationAction({ mutate: ['hasInternet'] })
  async setInternet () {
    return { hasInternet: true }
  }
}
