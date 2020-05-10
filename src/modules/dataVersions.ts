import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { DataVersionType } from '@/types/utilityTypes'

@Module({ namespaced: true, name: 'dateVersion' })
export default class DataVersions extends VuexModule {
  dateVersions: DataVersionType[] = []

  @MutationAction({ mutate: ['dateVersions'] })
  async fetchDataVersions () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/DataVersion`)
    return {
      dateVersions: results.data
    }
  }
}
