import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { WeaponPropertyType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'weaponProperties' })
export default class WeaponProperties extends VuexModule {
  weaponProperties: WeaponPropertyType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['weaponProperties', 'cachedVersion'] })
  async fetchWeaponProperties () {
    const { data: weaponProperties, cachedVersion } = await fetchFromCache(this, 'weaponProperties', 'weaponProperty')
    return { weaponProperties, cachedVersion }
  }
}
