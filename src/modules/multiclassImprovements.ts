import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { MulticlassImprovementType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'multiclassImprovements' })
export default class MulticlassImprovements extends VuexModule {
  multiclassImprovements: MulticlassImprovementType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['multiclassImprovements', 'cachedVersion'] })
  async fetchMulticlassImprovements () {
    const { data: multiclassImprovements, cachedVersion } = await fetchFromCache(this, 'multiclassImprovements', 'multiclassImprovement')
    return { multiclassImprovements, cachedVersion }
  }
}
