import safeFetch from '@/utilities/safeFetch'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { MonsterType } from '@/types/referenceTypes'

@Module({ namespaced: true, name: 'monster' })
export default class Monsters extends VuexModule {
  monsters: MonsterType[] = []

  @MutationAction({ mutate: ['monsters'] })
  async fetchMonsters () {
    const results = await safeFetch('api/Monster')
    return {
      monsters: results.data
    }
  }
}
