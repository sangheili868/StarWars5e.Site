import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { CharacterResult, RawCharacterType } from '@/types/rawCharacterTypes'
import baseCharacter from './CharacterEngine/baseCharacter.json'
import { findIndex, isEmpty, isEqual, debounce } from 'lodash'
import generateCharacter from './CharacterEngine/generateCharacter'
import { CharacterValidationType } from '@/types/utilityTypes'
import builderVersion from '@/version'
import axios, { AxiosRequestConfig } from 'axios'

const abilityScores = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma'
]

function stateOf (context: any) {
  // Vuex-module-decorator changes 'this' when it converts into a module.
  return (context as {
    state: {
      characters: RawCharacterType[]
    }
  }).state
}

function rootOf (myThis: any) {
  return (myThis as {
    rootGetters: {
      'authentication/isLoggedIn': boolean
    }
  })
}

const saveCharacterToDB = debounce(async (
  newCharacter: RawCharacterType,
  header: AxiosRequestConfig,
  myThis: any
): Promise<void> => {
  const characterResult = (await axios.post(
    `${process.env.VUE_APP_sw5eapiurl}/api/character`,
    {
      jsonData: JSON.stringify(newCharacter),
      id: newCharacter.id
    },
    header
  )).data
  myThis.dispatch('saveCharacterLocally', {
    ...JSON.parse(characterResult.jsonData),
    userId: characterResult.userId,
    id: characterResult.id
  })
}, 1000)

const updateCharacterList = (characters: RawCharacterType[], newCharacter: RawCharacterType) => {
  let index = findIndex(characters, ({ id, localId }) => id && newCharacter.id
    ? newCharacter.id === id
    : localId && newCharacter.localId ? newCharacter.localId === localId : false
  )
  if (index < 0) index = characters.length
  characters.splice(index, 1, newCharacter)
  return characters
}

@Module({ namespaced: true, name: 'character' })
export default class Character extends VuexModule {
  public characters: RawCharacterType[] = []

  get authenticationHeader (): (myThis: any) => Promise<AxiosRequestConfig> {
    return async (myThis) => {
      await myThis.dispatch('authentication/fetchAccessToken', {}, { root: 'true' })
      return myThis.rootGetters['authentication/axiosHeader']
    }
  }

  get getCharacterById () {
    return (characterId: string) => {
        const characters = stateOf(this.context).characters
        return characters.find(({ id }) => id === characterId) ||
          characters.find(({ localId }) => localId === characterId)
    }
  }

  get getIsEmptyCharacter () {
    return (character: RawCharacterType | undefined) => {
      if (!character) return true
      const { id, userId, localId, builderVersion, ...characterDetails } = character
      return isEmpty(character) || isEqual({ ...baseCharacter, ...characterDetails }, baseCharacter)
    }
  }

  get generateCompleteCharacter () {
    return (rawCharacter: RawCharacterType) => {
      // Disabled validation check here because we're transitioning the CharacterBuilder to require a CompleteCharacter object to work with throughout the CB
      // if (this.getCharacterValidation(rawCharacter).code === 0) {
        try {
          const rootState = this.context.rootState
          return generateCharacter(
            rawCharacter,
            rootState.classes.classes,
            rootState.archetypes.archetypes,
            rootState.species.species,
            rootState.equipment.equipment,
            rootState.enhancedItems.enhancedItems,
            rootState.powers.powers,
            rootState.maneuvers.maneuvers,
            rootState.feats.feats,
            rootState.features.features,
            rootState.backgrounds.backgrounds,
            rootState.characterAdvancements.characterAdvancements,
            rootState.skills.skills,
            rootState.conditions.conditions
          )
        } catch (e) {
          console.error('Character Generation failed. Character built with builder version ' + rawCharacter.builderVersion)
          console.error(e)
          return null
        }
      // }
    }
  }

  get getCharacterValidation () {
    return (character: RawCharacterType | undefined): CharacterValidationType => {
      if (!character) return { code: 1, message: 'No Character Found', isValid: false }
      return [
        { message: 'No character found', isValid: !isEmpty(character) },
        { message: 'Missing a name', isValid: character.name !== '' },
        { message: 'Missing a species', isValid: character.species && character.species.name !== '' },
        { message: 'Missing class levels', isValid: character.classes && character.classes.length > 0 },
        {
          message: 'Missing hit points for a class',
          isValid: character.classes && character.classes.every((myClass, index) =>
            myClass.hitPoints && myClass.hitPoints.length === myClass.levels - (!index ? 1 : 0)
        ) },
        {
          message: 'Missing an ability score',
          isValid: character.baseAbilityScores &&
            isEqual(Object.keys(character.baseAbilityScores).sort(), abilityScores.sort()) &&
            Object.values(character.baseAbilityScores).every(score => score > 0)
        },
        { message: 'Missing a background', isValid: character.background && character.background.name !== '' }
      ]
        .map((validation, index) => ({ code: index + 1, ...validation }))
        .find(({ isValid }) => !isValid) || { code: 0, message: 'All checks passed', isValid: true }
    }
  }

  @MutationAction({ mutate: ['characters'] })
  async saveCharacter (newCharacter: RawCharacterType) {
    newCharacter = { ...newCharacter, builderVersion, changedAt: Date.now() }
    if (rootOf(this).rootGetters['authentication/isLoggedIn']) {
      const header = await (this as any).getters.authenticationHeader(this) as AxiosRequestConfig
      saveCharacterToDB(newCharacter, header, this)
    }
    return { characters: updateCharacterList(stateOf(this).characters, newCharacter) }
  }

  @MutationAction({ mutate: ['characters'] })
  async saveCharacters (newCharacters: RawCharacterType[]) {
    let characters = stateOf(this).characters
    const header = await (this as any).getters.authenticationHeader(this) as AxiosRequestConfig
    if (newCharacters.length && rootOf(this).rootGetters['authentication/isLoggedIn']) {
      const response = await axios.post(`${process.env.VUE_APP_sw5eapiurl}/api/character/multiple`, {
        characterRequests: newCharacters.map(character => ({
          jsonData: JSON.stringify(character),
          id: character.id
        }))
      }, header)
      response.data.forEach((characterResult: { id: string, jsonData: string, userId: string }) => updateCharacterList(characters, {
        ...JSON.parse(characterResult.jsonData),
        userId: characterResult.userId,
        id: characterResult.id
      }))
    }
    return { characters }
  }

  @MutationAction({ mutate: ['characters'] })
  async saveCharacterLocally (newCharacter: RawCharacterType) {
    return { characters: updateCharacterList(stateOf(this).characters, {
      ...newCharacter,
      builderVersion,
      changedAt: Date.now()
    }) }
  }

  @MutationAction({ mutate: ['characters'] })
  async fetchCharacters () {
    if (rootOf(this).rootGetters['authentication/isLoggedIn']) {
      const header = await (this as any).getters.authenticationHeader(this) as AxiosRequestConfig
      const characterResults: CharacterResult[] = (await axios.get(
        `${process.env.VUE_APP_sw5eapiurl}/api/character`,
        header
      )).data

      return { characters: [
        ...characterResults.map(({ id, userId, jsonData }) => ({
          ...JSON.parse(jsonData) as RawCharacterType,
          id,
          userId
        })),
        ...stateOf(this).characters.filter(({ id }) => !id)
      ] }
    } else {
      return { characters: stateOf(this).characters }
    }
  }

  @MutationAction({ mutate: ['characters'] })
  async deleteCharacter (character: RawCharacterType) {
    if (rootOf(this).rootGetters['authentication/isLoggedIn']) {
      const header = await (this as any).getters.authenticationHeader(this) as AxiosRequestConfig

      await axios.delete(
        `${process.env.VUE_APP_sw5eapiurl}/api/character/${character.id}`,
        header
      )
    }
    return { characters: stateOf(this).characters.filter(({ localId, id }) => localId !== character.localId && id !== character.id) }
  }

  @MutationAction({ mutate: ['characters'] })
  async clearLocalCharacters () {
    return { characters: [] }
  }
}
