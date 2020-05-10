import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { DataVersionType } from '@/types/utilityTypes'

@Module({ namespaced: true, name: 'dataVersions' })
export default class DataVersions extends VuexModule {
  dataVersions: DataVersionType[] = []
  dataVersionTimeout: Date | null = null

  @MutationAction({ mutate: ['dataVersions', 'dataVersionTimeout'] })
  async fetchDataVersions () {
    let dataVersions
    let dataVersionTimeout = new Date()
    console.log('Fetching data versions from database')
    dataVersions = (await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/dataVersion`)).data
    dataVersionTimeout.setDate(dataVersionTimeout.getDate() + 3)
    return { dataVersions, dataVersionTimeout }
  }
}
