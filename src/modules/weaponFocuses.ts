import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { WeaponFocusType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'weaponFocuses' })
export default class WeaponFocuses extends VuexModule {
  weaponFocuses: WeaponFocusType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['weaponFocuses', 'cachedVersion'] })
  async fetchWeaponFocuses () {
    const { data: weaponFocuses, cachedVersion } = await fetchFromCache(this, 'weaponFocuses', 'weaponFocus')
    return { weaponFocuses, cachedVersion }
  }
}
