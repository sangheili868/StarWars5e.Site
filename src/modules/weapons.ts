import safeFetch from '@/utilities/safeFetch'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { WeaponType, GearType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'weapon' })
export default class Weapons extends VuexModule {
  weapons: WeaponType[] = []

  @MutationAction({ mutate: ['weapons'] })
  async fetchWeapons () {
    const results = await safeFetch('api/Equipment')
    return {
      weapons: results.data.filter(({ equipmentCategory }: GearType) => equipmentCategory === 'Weapon')
    }
  }
}
