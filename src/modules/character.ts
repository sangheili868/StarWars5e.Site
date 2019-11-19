import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { RawCharacterType } from '@/types/rawCharacterTypes'
import baseCharacter from './CharacterEngine/baseCharacter.json'
import { isEmpty, merge, get, set } from 'lodash'
import generateCharacter from './CharacterEngine/generateCharacter'
import classesModule from './classes'
import equipmentModule from './equipment'
import powersModule from './powers'
import featsModule from './feats'
import backgroundsModule from './backgrounds'

@Module({ namespaced: true, name: 'character' })
export default class Character extends VuexModule {
  character: RawCharacterType = baseCharacter

  get isValidCharacter () {
    return
      this.character.name &&
      this.character.species.name &&
      this.character.classes.length > 0 &&
      this.character.classes[0].name &&
      Object.values(this.character.baseAbilityScores).every(score => score> 0)
  }

  get completeCharacter () {
    console.log(this.character)
    return !isEmpty(this.character) && generateCharacter(
      this.character as RawCharacterType,
      classesModule.state.classes,
      equipmentModule.state.equipment,
      powersModule.state.powers,
      featsModule.state.feats,
      backgroundsModule.state.backgrounds
    )
  }

  @MutationAction({ mutate: ['character'] })
  async createCharacter () {
    return {
      character: baseCharacter
    }
  }

  @MutationAction({ mutate: ['character'] })
  async setCharacter (newCharacter: RawCharacterType) {
    return {
      character: newCharacter
    }
  }

  @MutationAction({ mutate: ['character'] })
  async updateCharacter (newCharacter: RawCharacterType) {
    return {
      character: merge({}, this.character, newCharacter)
    }
  }

  @MutationAction({ mutate: ['character'] })
  async deleteCharacterProperty (path: string, index: number) {
    const updatedList = get(this.character, path).filter((item: any, itemIndex: number) => itemIndex !== index)
    let characterCopy = merge({}, this.character)
    set(characterCopy, path, updatedList)
    return {
      character: characterCopy
    }
  }

  @MutationAction({ mutate: ['character'] })
  async replaceCharacterProperty (path: string, list: any[]) {
    let characterCopy = merge({}, this.character)
    set(characterCopy, path, list)
    return {
      character: characterCopy
    }
  }
}
