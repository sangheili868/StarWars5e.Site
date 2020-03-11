import safeFetch from '@/utilities/safeFetch'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ArmorType, GearType } from '@/types/lootTypes'
import safeFetch from '@/utilities/safeFetch'

@Module({ namespaced: true, name: 'armor' })
export default class Armor extends VuexModule {
  armor: ArmorType[] = []

  @MutationAction({ mutate: ['armor'] })
  async fetchArmor () {
    const results = await safeFetch('api/Equipment')
    return {
      armor: results.data.filter(({ equipmentCategory }: GearType) => equipmentCategory === 'Armor')
    }
  }
}
