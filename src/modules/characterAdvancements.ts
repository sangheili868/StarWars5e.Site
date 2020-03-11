import safeFetch from '@/utilities/safeFetch'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { CharacterAdvancementType } from '@/types/lookupTypes'

@Module({ namespaced: true, name: 'characterAdvancements' })
export default class CharacterAdvancements extends VuexModule {
  characterAdvancements: CharacterAdvancementType[] = []

  @MutationAction({ mutate: ['characterAdvancements'] })
  async fetchCharacterAdvancements () {
    const results = await safeFetch('api/CharacterAdvancement')
    return {
      characterAdvancements: results.data
    }
  }
}
