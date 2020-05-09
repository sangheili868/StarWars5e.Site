import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ConditionType } from '@/types/lookupTypes'

@Module({ namespaced: true, name: 'conditions' })
export default class Conditions extends VuexModule {
  conditions: ConditionType[] = []

  @MutationAction({ mutate: ['conditions'] })
  async fetchConditions () {
    return {
      conditions: await fetchFromCache((this as any).state.conditions, 'Conditions')
    }
  }
}
