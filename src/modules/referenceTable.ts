import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ReferenceTableType } from '@/types/utilityTypes'

@Module({ namespaced: true, name: 'referenceTable' })
export default class ReferenceTables extends VuexModule {
  referenceTables: ReferenceTableType[] = []

  @MutationAction({ mutate: ['referenceTables'] })
  async fetchReferenceTables () {
    return {
      referenceTables: await fetchFromCache((this as any).state.referenceTables, 'ReferenceTable')
    }
  }
}
