import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipSizeType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'starshipSizes' })
export default class StarshipSizes extends VuexModule {
  starshipSizes: StarshipSizeType[] = []

  @MutationAction({ mutate: ['starshipSizes'] })
  async fetchStarshipSizes () {
    return {
      starshipSizes: await fetchFromCache((this as any).state.starshipSize, 'StarshipBaseSize')
    }
  }
}
