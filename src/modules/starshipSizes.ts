import safeFetch from '@/utilities/safeFetch'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipSizeType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'starshipSizes' })
export default class StarshipSizes extends VuexModule {
  starshipSizes: StarshipSizeType[] = []

  @MutationAction({ mutate: ['starshipSizes'] })
  async fetchStarshipSizes () {
    const results = await safeFetch('api/StarshipBaseSize')
    return {
      starshipSizes: results.data
    }
  }
}
