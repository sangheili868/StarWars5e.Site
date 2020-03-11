import safeFetch from '@/utilities/safeFetch'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { VentureType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'venture' })
export default class Ventures extends VuexModule {
  ventures: VentureType[] = []

  @MutationAction({ mutate: ['ventures'] })
  async fetchVentures () {
    const results = await safeFetch('api/StarshipVenture')
    return {
      ventures: results.data
    }
  }
}
