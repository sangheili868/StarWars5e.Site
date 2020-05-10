import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { MonsterType } from '@/types/referenceTypes'

@Module({ namespaced: true, name: 'monsters' })
export default class Monsters extends VuexModule {
  monsters: MonsterType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['monsters', 'cachedVersion'] })
  async fetchMonsters () {
    const { data: monsters, cachedVersion } = await fetchFromCache(this, 'monsters', 'monster')
    return { monsters, cachedVersion }
  }
}
