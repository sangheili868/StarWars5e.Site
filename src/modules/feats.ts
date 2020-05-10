import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { FeatType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'feats' })
export default class Feats extends VuexModule {
  feats: FeatType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['feats', 'cachedVersion'] })
  async fetchFeats () {
    const { data: feats, cachedVersion } = await fetchFromCache(this, 'feats', 'feat')
    return { feats, cachedVersion }
  }
}
