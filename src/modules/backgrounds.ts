import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { BackgroundType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'backgrounds' })
export default class Backgrounds extends VuexModule {
  backgrounds: BackgroundType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['backgrounds', 'cachedVersion'] })
  async fetchBackgrounds () {
    const { data: backgrounds, cachedVersion } = await fetchFromCache(this, 'backgrounds', 'background')
    return { backgrounds, cachedVersion }
  }
}
