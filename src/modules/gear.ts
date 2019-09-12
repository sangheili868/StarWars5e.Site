import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { GearType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'gear' })
export default class Gear extends VuexModule {
  gear: GearType[] = []

  @MutationAction({ mutate: ['gear'] })
  async fetchGear () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Equipment`)
    return {
      gear: results.data.filter(({ equipmentCategory }: GearType) => !['Weapon', 'Armor'].includes(equipmentCategory))
    }
  }
}
