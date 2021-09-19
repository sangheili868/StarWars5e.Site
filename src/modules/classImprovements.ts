import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ClassImprovementType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'classImprovements' })
export default class ClassImprovements extends VuexModule {
  classImprovements: ClassImprovementType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['classImprovements', 'cachedVersion'] })
  async fetchClassImprovements () {
    const { data: classImprovements, cachedVersion } = await fetchFromCache(this, 'classImprovements', 'classImprovement')
    return { classImprovements, cachedVersion }
  }
}
