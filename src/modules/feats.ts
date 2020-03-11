import safeFetch from '@/utilities/safeFetch'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { FeatType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'feat' })
export default class Feats extends VuexModule {
  feats: FeatType[] = []

  @MutationAction({ mutate: ['feats'] })
  async fetchFeats () {
    const results = await safeFetch('api/Feat')
    return {
      feats: results.data
    }
  }
}
