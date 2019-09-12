import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipWeaponType, StarshipEquipmentType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'starshipWeapon' })
export default class StarshipWeapons extends VuexModule {
  starshipWeapons: StarshipWeaponType[] = []

  @MutationAction({ mutate: ['starshipWeapons'] })
  async fetchStarshipWeapons () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/StarshipEquipment`)
    return {
      starshipWeapons: results.data.filter(({ type }: StarshipEquipmentType) => type === 'Weapon')
    }
  }
}
