import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { FeatType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'feat' })
export default class Feats extends VuexModule {
  feats: FeatType[] = []

  @MutationAction({ mutate: ['feats'] })
  async fetchFeats () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Feat`)
    return {
      feats: results.data
    }
  }
}
