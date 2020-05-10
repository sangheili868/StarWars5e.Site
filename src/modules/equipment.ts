import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { EquipmentType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'equipment' })
export default class Equipment extends VuexModule {
  equipment: EquipmentType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['equipment', 'cachedVersion'] })
  async fetchEquipment () {
    const { data: equipment, cachedVersion } = await fetchFromCache(this, 'equipment', 'equipment')
    return { equipment, cachedVersion }
  }
}
