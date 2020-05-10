import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipSizeType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'starshipSizes' })
export default class StarshipSizes extends VuexModule {
  starshipSizes: StarshipSizeType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['starshipSizes', 'cachedVersion'] })
  async fetchStarshipSizes () {
    const { data: starshipSizes, cachedVersion } = await fetchFromCache(this, 'starshipSizes', 'starshipBaseSize')
    return { starshipSizes, cachedVersion }
  }
}
