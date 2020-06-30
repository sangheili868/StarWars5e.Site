import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { LightsaberFormType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'lightsaberForms' })
export default class LightsaberForms extends VuexModule {
  lightsaberForms: LightsaberFormType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['lightsaberForms', 'cachedVersion'] })
  async fetchLightsaberForms () {
    const { data: lightsaberForms, cachedVersion } = await fetchFromCache(this, 'lightsaberForms', 'lightsaberForm')
    return { lightsaberForms, cachedVersion }
  }
}
