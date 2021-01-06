import { FeatureType } from '@/types/characterTypes'
import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'features' })
export default class Features extends VuexModule {
  features: FeatureType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['features', 'cachedVersion'] })
  async fetchFeatures () {
    const { data: features, cachedVersion } = await fetchFromCache(this, 'features', 'feature')
    return { features, cachedVersion }
  }
}
