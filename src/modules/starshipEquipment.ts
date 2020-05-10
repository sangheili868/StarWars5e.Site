import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipEquipmentType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'starshipEquipment' })
export default class StarshipEquipment extends VuexModule {
  starshipEquipment: StarshipEquipmentType[] = []

  @MutationAction({ mutate: ['starshipEquipment'] })
  async fetchStarshipEquipment () {
    return {
      starshipEquipment: (await fetchFromCache((this as any).state.starshipEquipment, 'StarshipEquipment'))
    }
  }
}
