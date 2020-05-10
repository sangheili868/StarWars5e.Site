import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { VentureType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'venture' })
export default class Ventures extends VuexModule {
  ventures: VentureType[] = []

  @MutationAction({ mutate: ['ventures'] })
  async fetchVentures () {
    return {
      ventures: await fetchFromCache((this as any).state.ventures, 'Venture')
    }
  }
}
