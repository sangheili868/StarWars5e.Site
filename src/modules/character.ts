import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { RawCharacterType } from '@/types/rawCharacterTypes'
import baseCharacter from '@/pages/MyContent/CharacterBuilder/baseCharacter.json'

@Module({ namespaced: true, name: 'character' })
export default class RawCharacters extends VuexModule {
  character: RawCharacterType = baseCharacter

  @MutationAction({ mutate: ['character'] })
  async fetchRawCharacters (newCharacter: RawCharacterType) {
    return {
      character: newCharacter
    }
  }
}
