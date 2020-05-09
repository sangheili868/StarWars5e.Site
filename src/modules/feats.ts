import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { FeatType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'feat' })
export default class Feats extends VuexModule {
  feats: FeatType[] = []

  @MutationAction({ mutate: ['feats'] })
  async fetchFeats () {
    return {
      feats: await fetchFromCache((this as any).state.feats, 'Feat')
    }
  }
}
