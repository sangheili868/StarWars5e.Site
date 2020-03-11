import safeFetch from '@/utilities/safeFetch'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { BackgroundType } from '@/types/characterTypes'
import safeFetch from '@/utilities/safeFetch'

@Module({ namespaced: true, name: 'background' })
export default class Backgrounds extends VuexModule {
  backgrounds: BackgroundType[] = []

  @MutationAction({ mutate: ['backgrounds'] })
  async fetchBackgrounds () {
    const results = await safeFetch('api/Background')
    return {
      backgrounds: results.data
    }
  }
}
