import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { StarshipEquipmentType } from '@/types/starshipTypes'

@Module({ namespaced: true, name: 'starshipEquipment' })
export default class StarshipEquipment extends VuexModule {
  starshipEquipment: StarshipEquipmentType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['starshipEquipment', 'cachedVersion'] })
  async fetchStarshipEquipment () {
    const { data: starshipEquipment, cachedVersion } = await fetchFromCache(this, 'starshipEquipment', 'starshipEquipment')
    return { starshipEquipment, cachedVersion }
  }
}
