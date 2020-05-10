import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ReferenceTableType } from '@/types/utilityTypes'

@Module({ namespaced: true, name: 'referenceTable' })
export default class ReferenceTables extends VuexModule {
  referenceTables: ReferenceTableType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['referenceTables', 'cachedVersion'] })
  async fetchReferenceTables () {
    const { data: referenceTables, cachedVersion } = await fetchFromCache((this as any).state, 'referenceTables', 'referenceTable')
    return { referenceTables, cachedVersion }
  }
}
