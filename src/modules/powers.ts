import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { PowerType } from '@/types/characterTypes.ts'

@Module({ namespaced: true, name: 'power' })
export default class Power extends VuexModule {
  powers: PowerType[] = []

  @MutationAction({ mutate: ['powers'] })
  async fetchPowers () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Power`)
    return {
      powers: results.data
    }
  }
}
