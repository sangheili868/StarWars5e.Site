import { Module, VuexModule, MutationAction, Mutation } from 'vuex-module-decorators'
import { Vue } from 'vue-property-decorator'
import { RawCharacterType } from '@/types/rawCharacterTypes'
import _ from 'lodash'

@Module({ namespaced: true, name: 'characters' })
export default class Characters extends VuexModule {
  characters: RawCharacterType[] = []

  @MutationAction({ mutate: ['characters'] })
  async fetchCharacters () {
    const http = this.context.rootState.authentication.authedAxios
    const characterResults: any[] = await http.get(`${process.env.VUE_APP_sw5eapiurl}/api/character`).data

    var characters: RawCharacterType[] = []
    _.each(characterResults, (characterResult: any) => {
      var newCharacter = JSON.parse(characterResult.jsonData) as RawCharacterType
      newCharacter.userId = characterResult.userId
      newCharacter.id = characterResult.id
      characters.push(newCharacter)
    })

    return { characters }
  }

  @MutationAction({ mutate: ['characters'] })
  async addCharacter () {
    const http = this.context.rootState.authentication.authedAxios
    const character = await http.post(`${process.env.VUE_APP_sw5eapiurl}/api/character`).data
    this.characters.push(character)

    return { characters: this.characters }
  }
}
