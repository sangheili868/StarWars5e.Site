import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipModificationType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'starshipModification' })
export default class StarshipModifications extends VuexModule {
  starshipModifications: StarshipModificationType[] = []

  @MutationAction({ mutate: ['starshipModifications'] })
  async fetchStarshipModifications () {
    return {
      starshipModifications: await fetchFromCache((this as any).state.starshipModification, 'StarshipModification')
    }
  }
}
