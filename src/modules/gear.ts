import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { GearType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'gear' })
export default class Gear extends VuexModule {
  gear: GearType[] = []

  @MutationAction({ mutate: ['gear'] })
  async fetchGears () {
    return {
      gear: (await fetchFromCache((this as any).rootState.equipment.equipment, 'Equipment'))
        .filter(({ equipmentCategory }: GearType) => !['Weapon', 'Armor'].includes(equipmentCategory))
    }
  }
}
