import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { EquipmentType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'armor' })
export default class Equipment extends VuexModule {
  equipment: EquipmentType[] = []

  @MutationAction({ mutate: ['equipment'] })
  async fetchEquipment () {
    return {
      equipment: await fetchFromCache((this as any).state.equipment, 'Equipment')
    }
  }
}
