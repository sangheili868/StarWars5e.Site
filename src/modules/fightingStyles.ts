import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { FightingStyleType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'fightingStyles' })
export default class FightingStyles extends VuexModule {
  fightingStyles: FightingStyleType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['fightingStyles', 'cachedVersion'] })
  async fetchFightingStyles () {
    const { data: fightingStyles, cachedVersion } = await fetchFromCache(this, 'fightingStyles', 'fightingStyle')
    console.log('Fighting Styles Fetched!')
    return { fightingStyles, cachedVersion }
  }
}
