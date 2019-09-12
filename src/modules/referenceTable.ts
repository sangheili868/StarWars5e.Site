import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ReferenceTableType } from '@/types/utilityTypes'

@Module({ namespaced: true, name: 'referenceTable' })
export default class ReferenceTables extends VuexModule {
  referenceTables: ReferenceTableType[] = []

  @MutationAction({ mutate: ['referenceTables'] })
  async fetchReferenceTables () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/ReferenceTable`)
    return {
      referenceTables: results.data
    }
  }
}
