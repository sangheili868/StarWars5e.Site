import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { WeaponSupremacyType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'weaponSupremacies' })
export default class WeaponSupremacies extends VuexModule {
  weaponSupremacies: WeaponSupremacyType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['weaponSupremacies', 'cachedVersion'] })
  async fetchWeaponSupremacies () {
    const { data: weaponSupremacies, cachedVersion } = await fetchFromCache(this, 'weaponSupremacies', 'weaponSupremacy')
    return { weaponSupremacies, cachedVersion }
  }
}
