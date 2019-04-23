import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipSizeType } from '@/types'

@Module({ namespaced: true, name: 'starshipSize' })
export default class StarshipSizes extends VuexModule {
  starshipSizes: StarshipSizeType[] = []

  @MutationAction({ mutate: ['starshipSizes'] })
  async fetchStarshipSizes () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/StarshipSize`)
    return {
      starshipSizes: results.data
    }
  }
}
