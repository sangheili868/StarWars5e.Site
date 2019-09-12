import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipEquipmentType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'starshipEquipment' })
export default class StarshipEquipment extends VuexModule {
  starshipEquipment: StarshipEquipmentType[] = []

  @MutationAction({ mutate: ['starshipEquipment'] })
  async fetchStarshipEquipment () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/StarshipEquipment`)
    return {
      starshipEquipment: results.data.filter(({ type }: StarshipEquipmentType) => type !== 'Weapon')
    }
  }
}
