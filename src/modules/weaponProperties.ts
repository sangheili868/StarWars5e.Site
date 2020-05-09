import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { WeaponPropertyType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'weaponProperties' })
export default class WeaponProperties extends VuexModule {
  weaponProperties: WeaponPropertyType[] = []

  @MutationAction({ mutate: ['weaponProperties'] })
  async fetchWeaponPropertys () {
    return {
      weaponProperties: await fetchFromCache((this as any).state.weaponProperties, 'WeaponProperty')
    }
  }
}
