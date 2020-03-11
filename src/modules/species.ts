import safeFetch from '@/utilities/safeFetch'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { SpeciesType } from '@/types/characterTypes.ts'

@Module({ namespaced: true, name: 'species' })
export default class Species extends VuexModule {
  species: SpeciesType[] = []

  @MutationAction({ mutate: ['species'] })
  async fetchSpecies () {
    const results = await safeFetch('api/Species')
    return {
      species: results.data
    }
  }
}
