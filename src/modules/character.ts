import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators'
import { CharacterResult, RawCharacterType } from '@/types/rawCharacterTypes'
import baseCharacter from './CharacterEngine/baseCharacter.json'
import { merge, get, set, omit, each } from 'lodash'
import generateCharacter from './CharacterEngine/generateCharacter'
import { CharacterValidationType } from '@/types/utilityTypes'
import validateCharacter from './CharacterEngine/validateCharacter'
import builderVersion from '@/version'
import axios, { AxiosRequestConfig } from 'axios'

function stateOf (context: any) {
  // Vuex-module-decorator changes 'this' when it converts into a module.
  return (context as {
    state: {
      character: RawCharacterType,
      characters: RawCharacterType[]
    }
  }).state
}

function rootOf (myThis: any) {
  return (myThis as {
    rootGetters: {
      'authentication/axiosHeader': AxiosRequestConfig
    },
    rootState: {
      authentication: {
        accessToken: string
      }
    }
  })
}

@Module({ namespaced: true, name: 'character' })
export default class Character extends VuexModule {
  public character: RawCharacterType = baseCharacter
  public characters: RawCharacterType[] = []
  public isDirty: boolean = false

  get characterValidation (): CharacterValidationType {
    return validateCharacter(stateOf(this.context).character)
  }

  get completeCharacter () {
    if (this.characterValidation.isValid) {
      const rootState = this.context.rootState
      const rawCharacter = stateOf(this.context).character
      let character = null
      try {
        character = generateCharacter(
          rawCharacter,
          rootState.classes.classes,
          rootState.archetypes.archetypes,
          rootState.species.species,
          rootState.equipment.equipment,
          rootState.enhancedItems.enhancedItems,
          rootState.powers.powers,
          rootState.feats.feats,
          rootState.backgrounds.backgrounds,
          rootState.characterAdvancements.characterAdvancements,
          rootState.skills.skills,
          rootState.conditions.conditions
        )
      } catch (e) {
        console.error('Character Generation failed. Character built with builder version ' + rawCharacter.builderVersion)
        console.error(e)
        character = null
      }
      return character
    }
  }

  @MutationAction({ mutate: ['character', 'isDirty'] })
  async createCharacter () {
    return {
      isDirty: false,
      character: {
        ...baseCharacter,
        builderVersion
      }
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

  @MutationAction({ mutate: ['character'] })
  async loadCharacter (characterId: string) {
    return { character: stateOf(this).characters.find(({ id }) => id === characterId) }
  }

  @MutationAction({ mutate: ['characters'] })
  async fetchCharacters () {
    if (rootOf(this).rootState.authentication.accessToken) {
      const characterResults: CharacterResult[] = (await axios.get(
        `${process.env.VUE_APP_sw5eapiurl}/api/character`,
        rootOf(this).rootGetters['authentication/axiosHeader']
      )).data

      return { characters: characterResults.map(({ id, userId, jsonData }) => ({
        ...JSON.parse(jsonData) as RawCharacterType,
        id,
        userId
      })) }
    } else {
      return { characters: stateOf(this).characters }
    }
  }

  @MutationAction({ mutate: ['characters'] })
  async saveCharacter (character: RawCharacterType) {
    const characterResult: CharacterResult = (await axios.post(
      `${process.env.VUE_APP_sw5eapiurl}/api/character`,
      { jsonData: JSON.stringify(character), id: character.id },
      rootOf(this).rootGetters['authentication/axiosHeader']
    )).data

    let newCharacter = JSON.parse(characterResult.jsonData) as RawCharacterType
    newCharacter.userId = characterResult.userId
    newCharacter.id = characterResult.id

    const characters = stateOf(this).characters

    return { characters: [ ...characters, newCharacter ] }
  }
}
