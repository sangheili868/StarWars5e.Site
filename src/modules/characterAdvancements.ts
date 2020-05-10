import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { CharacterAdvancementType } from '@/types/lookupTypes'

@Module({ namespaced: true, name: 'characterAdvancement' })
export default class CharacterAdvancements extends VuexModule {
  characterAdvancements: CharacterAdvancementType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['characterAdvancements', 'cachedVersion'] })
  async fetchCharacterAdvancements () {
    const state = (this as any).state
    const { data: characterAdvancements, cachedVersion } = await fetchFromCache(state.characterAdvancements, state.cachedVersion, 'characterAdvancements', 'CharacterAdvancement')
    return { characterAdvancements, cachedVersion }
  }
}
