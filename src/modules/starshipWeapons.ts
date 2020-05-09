import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipWeaponType, StarshipEquipmentType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'starshipWeapon' })
export default class StarshipWeapons extends VuexModule {
  starshipWeapons: StarshipWeaponType[] = []

  @MutationAction({ mutate: ['starshipWeapons'] })
  async fetchStarshipWeapons () {
    return {
      starshipWeapons: (await fetchFromCache((this as any).rootState.StarshipEquipment.starshipEquipment, 'StarshipEquipment'))
        .filter(({ type }: StarshipEquipmentType) => type === 'Weapon')
    }
  }
}
