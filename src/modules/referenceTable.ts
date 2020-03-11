import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ReferenceTableType } from '@/types/utilityTypes'
import safeFetch from '@/utilities/safeFetch'

@Module({ namespaced: true, name: 'referenceTable' })
export default class ReferenceTables extends VuexModule {
  referenceTables: ReferenceTableType[] = []

  @MutationAction({ mutate: ['referenceTables'] })
  async fetchReferenceTables () {
    const results = await safeFetch('api/ReferenceTable')
    return {
      referenceTables: results.data || []
    }
  }
}
