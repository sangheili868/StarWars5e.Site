import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { VentureType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'ventures' })
export default class Ventures extends VuexModule {
  ventures: VentureType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['ventures', 'cachedVersion'] })
  async fetchVentures () {
    const { data: ventures, cachedVersion } = await fetchFromCache(this, 'ventures', 'starshipVenture')
    return { ventures, cachedVersion }
  }
}
