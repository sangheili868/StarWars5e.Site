import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ArmorType, GearType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'armor' })
export default class Armor extends VuexModule {
  armor: ArmorType[] = []

  @MutationAction({ mutate: ['armor'] })
  async fetchArmor () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Equipment`)
    return {
      armor: results.data.filter(({ equipmentCategory }: GearType) => equipmentCategory === 'Armor')
    }
  }
}
