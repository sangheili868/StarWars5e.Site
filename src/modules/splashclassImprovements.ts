import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { SplashclassImprovementType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'splashclassImprovements' })
export default class SplashclassImprovements extends VuexModule {
  splashclassImprovements: SplashclassImprovementType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['splashclassImprovements', 'cachedVersion'] })
  async fetchSplashclassImprovements () {
    const { data: splashclassImprovements, cachedVersion } = await fetchFromCache(this, 'splashclassImprovements', 'splashclassImprovement')
    return { splashclassImprovements, cachedVersion }
  }
}
