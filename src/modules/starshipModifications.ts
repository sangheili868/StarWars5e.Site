import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipModificationType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'starshipModifications' })
export default class StarshipModifications extends VuexModule {
  starshipModifications: StarshipModificationType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['starshipModifications', 'cachedVersion'] })
  async fetchStarshipModifications () {
    const { data: starshipModifications, cachedVersion } = await fetchFromCache(this, 'starshipModifications', 'starshipModification')
    return { starshipModifications, cachedVersion }
  }
}
