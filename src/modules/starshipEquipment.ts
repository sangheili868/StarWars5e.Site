import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipEquipmentType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'starshipEquipment' })
export default class StarshipEquipments extends VuexModule {
  starshipEquipment: StarshipEquipmentType[] = []

  @MutationAction({ mutate: ['starshipEquipment'] })
  async fetchStarshipEquipments () {
    return {
      starshipEquipment: (await fetchFromCache((this as any).state.starshipEquipment, 'StarshipEquipment'))
        .filter(({ type }: StarshipEquipmentType) => type !== 'Weapon')
    }
  }
}
