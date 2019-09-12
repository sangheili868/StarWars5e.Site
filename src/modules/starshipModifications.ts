import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipModificationType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'starshipModification' })
export default class StarshipModifications extends VuexModule {
  starshipModifications: StarshipModificationType[] = []

  @MutationAction({ mutate: ['starshipModifications'] })
  async fetchStarshipModifications () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/StarshipModification`)
    return {
      starshipModifications: results.data
    }
  }
}
