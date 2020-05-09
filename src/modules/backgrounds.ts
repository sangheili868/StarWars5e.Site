import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { BackgroundType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'background' })
export default class Backgrounds extends VuexModule {
  backgrounds: BackgroundType[] = []

  @MutationAction({ mutate: ['backgrounds'] })
  async fetchBackgrounds () {
    return {
      backgrounds: await fetchFromCache((this as any).state.backgrounds, 'Background')
    }
  }
}
