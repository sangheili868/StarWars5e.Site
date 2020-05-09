import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { MonsterType } from '@/types/referenceTypes'

@Module({ namespaced: true, name: 'monster' })
export default class Monsters extends VuexModule {
  monsters: MonsterType[] = []

  @MutationAction({ mutate: ['monsters'] })
  async fetchMonsters () {
    return {
      monsters: await fetchFromCache((this as any).state.monsters, 'Monster')
    }
  }
}
