import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { VentureType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'venture' })
export default class Ventures extends VuexModule {
  ventures: VentureType[] = []

  @MutationAction({ mutate: ['ventures'] })
  async fetchVentures () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/StarshipVenture`)
    return {
      ventures: results.data
    }
  }
}
