import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { FightingMasteryType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'fightingMasteries' })
export default class FightingMasteries extends VuexModule {
  fightingMasteries: FightingMasteryType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['fightingMasteries', 'cachedVersion'] })
  async fetchFightingMasteries () {
    const { data: fightingMasteries, cachedVersion } = await fetchFromCache(this, 'fightingMasteries', 'fightingMastery')
    return { fightingMasteries, cachedVersion }
  }
}
