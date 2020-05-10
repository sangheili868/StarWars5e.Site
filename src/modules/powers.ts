import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { PowerType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'powers' })
export default class Powers extends VuexModule {
  powers: PowerType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['powers', 'cachedVersion'] })
  async fetchPowers () {
    const { data: powers, cachedVersion } = await fetchFromCache(this, 'powers', 'power')
    return { powers, cachedVersion }
  }
}
