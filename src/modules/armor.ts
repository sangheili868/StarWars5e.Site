import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ArmorType, GearType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'armor' })
export default class Armor extends VuexModule {
  armor: ArmorType[] = []

  @MutationAction({ mutate: ['armor'] })
  async fetchArmors () {
    return {
      armor: (await fetchFromCache((this as any).rootState.equipment.equipment, 'Equipment'))
        .filter(({ equipmentCategory }: GearType) => equipmentCategory === 'Armor')
    }
  }
}
