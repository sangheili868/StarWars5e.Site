import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { CharacterAdvancementType } from '@/types/lookupTypes'

@Module({ namespaced: true, name: 'characterAdvancements' })
export default class CharacterAdvancements extends VuexModule {
  characterAdvancements: CharacterAdvancementType[] = []

  @MutationAction({ mutate: ['characterAdvancements'] })
  async fetchCharacterAdvancements () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/CharacterAdvancement`)
    return {
      characterAdvancements: results.data
    }
  }
}
