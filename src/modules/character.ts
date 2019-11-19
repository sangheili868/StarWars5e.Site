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

function stateOf (context: any) {
  // Vuex-module-decorator changes 'this' when it converts into a module.
  return (context as {
    state: {
      character: RawCharacterType
    }
  }).state
}

@Module({ namespaced: true, name: 'character' })
export default class Character extends VuexModule {
  public character: RawCharacterType = baseCharacter

  get isValidCharacter () {
    const myCharacter = stateOf(this).character
    return !isEmpty(myCharacter) && myCharacter.name &&
      myCharacter.species.name &&
      myCharacter.classes.length > 0 &&
      myCharacter.classes[0].name &&
      Object.values(myCharacter.baseAbilityScores).every(score => score > 0) &&
      myCharacter.background.name
  }

  get completeCharacter () {
    return this.isValidCharacter && generateCharacter(
      stateOf(this).character,
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
  async updateCharacter (newCharacter: RawCharacterType, x: any, y: any, z: any) {
    return {
      character: merge({}, stateOf(this).character, newCharacter)
    }
  }

  @MutationAction({ mutate: ['character'] })
  async deleteCharacterProperty (path: string, index: number) {
    const updatedList = get(stateOf(this).character, path).filter((item: any, itemIndex: number) => itemIndex !== index)
    let characterCopy = merge({}, stateOf(this).character)
    set(characterCopy, path, updatedList)
    return {
      character: characterCopy
    }
  }

  @MutationAction({ mutate: ['character'] })
  async replaceCharacterProperty (path: string, list: any[]) {
    let characterCopy = merge({}, stateOf(this).character)
    set(characterCopy, path, list)
    return {
      character: characterCopy
    }
  }
}
