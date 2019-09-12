import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipSizeType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'starshipSizes' })
export default class StarshipSizes extends VuexModule {
  starshipSizes: StarshipSizeType[] = []

  @MutationAction({ mutate: ['starshipSizes'] })
  async fetchStarshipSizes () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/StarshipBaseSize`)
    return {
      starshipSizes: results.data
    }
  }
}
