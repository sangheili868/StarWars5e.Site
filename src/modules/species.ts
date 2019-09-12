import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { SpeciesType } from '@/types/characterTypes.ts'

@Module({ namespaced: true, name: 'species' })
export default class Species extends VuexModule {
  species: SpeciesType[] = []

  @MutationAction({ mutate: ['species'] })
  async fetchSpecies () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Species`)
    return {
      species: results.data
    }
  }
}
