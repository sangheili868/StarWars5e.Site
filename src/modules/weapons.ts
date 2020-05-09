import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { WeaponType, GearType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'weapon' })
export default class Weapons extends VuexModule {
  weapons: WeaponType[] = []

  @MutationAction({ mutate: ['weapons'] })
  async fetchWeapons () {
    return {
      weapons: (await fetchFromCache((this as any).rootState.equipment.equipment, 'Equipment'))
        .filter(({ equipmentCategory }: GearType) => equipmentCategory === 'Weapon')
    }
  }
}
