import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { CharacterAdvancementType } from '@/types/lookupTypes'

@Module({ namespaced: true, name: 'characterAdvancements' })
export default class CharacterAdvancements extends VuexModule {
  characterAdvancements: CharacterAdvancementType[] = []

  @MutationAction({ mutate: ['characterAdvancements'] })
  async fetchCharacterAdvancements () {
    return {
      characterAdvancements: await fetchFromCache((this as any).state.characterAdvancements, 'CharacterAdvancement')
    }
  }
}
