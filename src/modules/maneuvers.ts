import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ManeuverType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'maneuvers' })
export default class Maneuvers extends VuexModule {
  maneuvers: ManeuverType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['maneuvers', 'cachedVersion'] })
  async fetchManeuvers () {
    const { data: maneuvers, cachedVersion } = await fetchFromCache(this, 'maneuvers', 'maneuvers')
    return { maneuvers, cachedVersion }
  }
}
