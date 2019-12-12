
import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { EquipmentType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'armor' })
export default class Armor extends VuexModule {
  equipment: EquipmentType[] = []

  @MutationAction({ mutate: ['equipment'] })
  async fetchEquipment () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Equipment`)
    return { equipment: results.data }
  }
}
