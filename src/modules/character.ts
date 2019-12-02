import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { RawCharacterType } from '@/types/rawCharacterTypes'
import baseCharacter from './CharacterEngine/baseCharacter.json'
import { isEmpty, merge, get, set, isEqual } from 'lodash'
import generateCharacter from './CharacterEngine/generateCharacter'

function stateOf (context: any) {
  // Vuex-module-decorator changes 'this' when it converts into a module.
  return (context as {
    state: {
      character: RawCharacterType
    }
  }).state
}

const abilityScores = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma'
]

@Module({ namespaced: true, name: 'character' })
export default class Character extends VuexModule {
  public character: RawCharacterType = baseCharacter

  get characterValidation () {
    const myCharacter = stateOf(this.context).character
    return [
      { message: 'Character is empty', isValid: !isEmpty(myCharacter) },
      { message: 'Character has no name', isValid: myCharacter.name },
      { message: 'Character has no species', isValid: myCharacter.species && myCharacter.species.name },
      { message: 'Character has no classes', isValid: myCharacter.classes && myCharacter.classes.length > 0 },
      { message: 'Class has no name', isValid: myCharacter.classes && myCharacter.classes.every(myClass => !!myClass.name) },
      {
        message: 'Class is missing hit points',
        isValid: myCharacter.classes && myCharacter.classes.every((myClass, index) =>
          myClass.hitPoints && myClass.hitPoints.length === myClass.levels - (!index ? 1 : 0)
      ) },
      {
        message: 'Ability Score is missing',
        isValid: myCharacter.baseAbilityScores &&
          isEqual(Object.keys(myCharacter.baseAbilityScores).sort(), abilityScores.sort())
      },
      {
        message: 'Ability Score is not positive',
        isValid: myCharacter.baseAbilityScores && Object.values(myCharacter.baseAbilityScores).every(score => score > 0)
      },
      { message: 'Background has no name', isValid: myCharacter.background && myCharacter.background.name },
      {
        message: 'Background feat has no name',
        isValid: myCharacter.background && myCharacter.background.feat && myCharacter.background.feat.name
      }
    ].find(({ isValid }) => !isValid) || { isValid: true, message: 'All checks passed' }
  }

  get completeCharacter () {
    if (this.characterValidation.isValid) {
      const rootState = this.context.rootState
      return generateCharacter(
        stateOf(this.context).character,
        rootState.classes.classes,
        rootState.species.species,
        rootState.equipment.equipment,
        rootState.powers.powers,
        rootState.feats.feats,
        rootState.backgrounds.backgrounds
      )
    }
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
      character: merge({}, stateOf(this).character, newCharacter)
    }
  }

  @MutationAction({ mutate: ['character'] })
  async deleteCharacterProperty ({ path, index }: { path: string, index: number }) {
    const updatedList = get(stateOf(this).character, path).filter((item: any, itemIndex: number) => itemIndex !== index)
    let characterCopy = merge({}, stateOf(this).character)
    set(characterCopy, path, updatedList)
    return {
      character: characterCopy
    }
  }

  @MutationAction({ mutate: ['character'] })
  async replaceCharacterProperty ({ path, property }: { path: string, property: any }) {
    let characterCopy = merge({}, stateOf(this).character)
    set(characterCopy, path, property)
    return {
      character: characterCopy
    }
  }
}
