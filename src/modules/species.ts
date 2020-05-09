import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { SpeciesType } from '@/types/characterTypes.ts'

@Module({ namespaced: true, name: 'species' })
export default class Species extends VuexModule {
  species: SpeciesType[] = []

  @MutationAction({ mutate: ['species'] })
  async fetchSpecies () {
    return {
      species: await fetchFromCache((this as any).state.species, 'Species')
    }
  }
}
