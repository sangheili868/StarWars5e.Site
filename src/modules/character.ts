import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { RawCharacterType } from '@/types/rawCharacterTypes'
import baseCharacter from './CharacterEngine/baseCharacter.json'
import { isEmpty, merge, get, set, isEqual, omit } from 'lodash'
import generateCharacter from './CharacterEngine/generateCharacter'
import { CharacterValidationType } from '@/types/utilityTypes'

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

  get characterValidation (): CharacterValidationType {
    const myCharacter = stateOf(this.context).character
    return [
      { message: 'No character found', isValid: !isEmpty(myCharacter) },
      { message: 'Missing a name', isValid: myCharacter.name !== '' },
      { message: 'Missing a species', isValid: myCharacter.species && myCharacter.species.name !== '' },
      { message: 'Missing class levels', isValid: myCharacter.classes && myCharacter.classes.length > 0 },
      {
        message: 'Missing hit points for a class',
        isValid: myCharacter.classes && myCharacter.classes.every((myClass, index) =>
          myClass.hitPoints && myClass.hitPoints.length === myClass.levels - (!index ? 1 : 0)
      ) },
      {
        message: 'Missing an ability score',
        isValid: myCharacter.baseAbilityScores &&
          isEqual(Object.keys(myCharacter.baseAbilityScores).sort(), abilityScores.sort()) &&
          Object.values(myCharacter.baseAbilityScores).every(score => score > 0)
      },
      { message: 'Missing a background', isValid: myCharacter.background && myCharacter.background.name !== '' },
      {
        message: 'Missing a background feat',
        isValid: myCharacter.background && myCharacter.background.feat !== undefined && myCharacter.background.feat.name !== ''
      }
    ]
      .map((validation, index) => ({ code: index + 1, ...validation }))
      .find(({ isValid }) => !isValid) || { code: 0, message: 'All checks passed', isValid: true }
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

  @MutationAction({ mutate: ['character'] })
  async replaceCharacterProperties (replacements: { path: string, property: any }[]) {
    let characterCopy = merge({}, stateOf(this).character)
    replacements.forEach(({ path, property }) => set(characterCopy, path, property))
    return {
      character: characterCopy
    }
  }
}
