import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { WeaponType, GearType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'weapon' })
export default class Weapons extends VuexModule {
  weapons: WeaponType[] = []

  @MutationAction({ mutate: ['weapons'] })
  async fetchWeapons () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Equipment`)
    return {
      weapons: results.data.filter(({ equipmentCategory }: GearType) => equipmentCategory === 'Weapon')
    }
  }
}
