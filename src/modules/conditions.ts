import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ConditionType } from '@/types/lookupTypes'

@Module({ namespaced: true, name: 'conditions' })
export default class Conditions extends VuexModule {
  conditions: ConditionType[] = []

  @MutationAction({ mutate: ['conditions'] })
  async fetchConditions () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Conditions`)
    return {
      conditions: results.data
    }
  }
}
