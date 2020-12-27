import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ConditionType } from '@/types/lookupTypes'

@Module({ namespaced: true, name: 'conditions' })
export default class Conditions extends VuexModule {
  conditions: ConditionType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['conditions', 'cachedVersion'] })
  async fetchConditions () {
    const { data: conditions, cachedVersion } = await fetchFromCache(this, 'conditions', 'conditions', 'conditionsLU')
    return { conditions, cachedVersion }
  }
}
