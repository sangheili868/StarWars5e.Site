import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { SpeciesType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'species' })
export default class Species extends VuexModule {
  species: SpeciesType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['species', 'cachedVersion'] })
  async fetchSpecies () {
    const { data: species, cachedVersion } = await fetchFromCache(this, 'species', 'species')
    return { species, cachedVersion }
  }
}
