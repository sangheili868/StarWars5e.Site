import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { RawCharacterType } from '@/types/rawCharacterTypes'
import baseCharacter from './CharacterEngine/baseCharacter.json'
import { merge, get, set, omit } from 'lodash'
import generateCharacter from './CharacterEngine/generateCharacter'
import { CharacterValidationType } from '@/types/utilityTypes'
import validateCharacter from './CharacterEngine/validateCharacter'

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
  public isDirty: boolean = false

  get characterValidation (): CharacterValidationType {
    return validateCharacter(stateOf(this.context).character)
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

  @MutationAction({ mutate: ['character', 'isDirty'] })
  async createCharacter () {
    return {
      isDirty: false,
      character: baseCharacter
    }
  }

  @MutationAction({ mutate: ['character', 'isDirty'] })
  async setCharacter (newCharacter: RawCharacterType) {
    return {
      isDirty: false,
      character: merge({}, baseCharacter, newCharacter)
    }
  }

  @MutationAction({ mutate: ['isDirty'] })
  async setClean () {
    return {
      isDirty: false
    }
  }

  @MutationAction({ mutate: ['character', 'isDirty'] })
  async updateCharacter (newCharacter: RawCharacterType) {
    return {
      isDirty: true,
      character: merge({}, stateOf(this).character, newCharacter)
    }
  }

  @MutationAction({ mutate: ['character', 'isDirty'] })
  async deleteCharacterProperty ({ path, index }: { path: string, index: number | string }) {
    const property = get(stateOf(this).character, path)
    let updatedProperty = omit(property, index)
    if (Array.isArray(property)) updatedProperty = Object.values(updatedProperty)
    let characterCopy = merge({}, stateOf(this).character)
    set(characterCopy, path, updatedProperty)
    return {
      isDirty: true,
      character: characterCopy
    }
  }

  @MutationAction({ mutate: ['character', 'isDirty'] })
  async replaceCharacterProperty ({ path, property }: { path: string, property: any }) {
    let characterCopy = merge({}, stateOf(this).character)
    set(characterCopy, path, property)
    return {
      isDirty: true,
      character: characterCopy
    }
  }

  @MutationAction({ mutate: ['character', 'isDirty'] })
  async replaceCharacterProperties (replacements: { path: string, property: any }[]) {
    let characterCopy = merge({}, stateOf(this).character)
    replacements.forEach(({ path, property }) => set(characterCopy, path, property))
    return {
      isDirty: true,
      character: characterCopy
    }
  }
}
