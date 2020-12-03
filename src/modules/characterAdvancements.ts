import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { CharacterAdvancementType } from '@/types/lookupTypes'

@Module({ namespaced: true, name: 'characterAdvancements' })
export default class CharacterAdvancements extends VuexModule {
  characterAdvancements: CharacterAdvancementType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['characterAdvancements', 'cachedVersion'] })
  async fetchCharacterAdvancements () {
    const { data: characterAdvancements, cachedVersion } = await fetchFromCache(this, 'characterAdvancements', 'characterAdvancement', 'characterAdvancementLU')
    return { characterAdvancements, cachedVersion }
  }
}
