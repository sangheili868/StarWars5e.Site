import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { RawCharacterType } from '@/types/rawCharacterTypes'
import baseCharacter from './CharacterEngine/baseCharacter.json'
import { isEmpty, merge, get, set, isEqual, omit } from 'lodash'
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
      { code: 1, message: 'Character is empty', isValid: !isEmpty(myCharacter) },
      { code: 2, message: 'Character has no name', isValid: myCharacter.name },
      { code: 3, message: 'Character has no species', isValid: myCharacter.species && myCharacter.species.name },
      { code: 4, message: 'Character has no classes', isValid: myCharacter.classes && myCharacter.classes.length > 0 },
      { code: 5, message: 'Class has no name', isValid: myCharacter.classes && myCharacter.classes.every(myClass => !!myClass.name) },
      {
        code: 6,
        message: 'Class is missing hit points',
        isValid: myCharacter.classes && myCharacter.classes.every((myClass, index) =>
          myClass.hitPoints && myClass.hitPoints.length === myClass.levels - (!index ? 1 : 0)
      ) },
      {
        code: 7,
        message: 'Ability Score is missing',
        isValid: myCharacter.baseAbilityScores &&
          isEqual(Object.keys(myCharacter.baseAbilityScores).sort(), abilityScores.sort())
      },
      {
        code: 8,
        message: 'Ability Score is not positive',
        isValid: myCharacter.baseAbilityScores && Object.values(myCharacter.baseAbilityScores).every(score => score > 0)
      },
      { code: 9, message: 'Background has no name', isValid: myCharacter.background && myCharacter.background.name },
      {
        code: 10,
        message: 'Background feat has no name',
        isValid: myCharacter.background && myCharacter.background.feat && myCharacter.background.feat.name
      }
    ].find(({ isValid }) => !isValid) || { code: 0, message: 'All checks passed', isValid: true }
  }

  get completeCharacter () {
    if (this.characterValidation.isValid) {
      const rootState = this.context.rootState
      return generateCharacter(
        stateOf(this.context).character,
        rootState.classes.classes,
        rootState.archetypes.archetypes,
        rootState.species.species,
        rootState.equipment.equipment,
        rootState.powers.powers,
        rootState.feats.feats,
        rootState.backgrounds.backgrounds,
        rootState.characterAdvancements.characterAdvancements,
        rootState.skills.skills,
        rootState.conditions.conditions
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
  async deleteCharacterProperty ({ path, index }: { path: string, index: number | string }) {
    const property = get(stateOf(this).character, path)
    let updatedProperty = omit(property, index)
    if (Array.isArray(property)) updatedProperty = Object.values(updatedProperty)
    let characterCopy = merge({}, stateOf(this).character)
    set(characterCopy, path, updatedProperty)
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
