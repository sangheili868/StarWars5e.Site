import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { BackgroundType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'background' })
export default class Backgrounds extends VuexModule {
  backgrounds: BackgroundType[] = []

  @MutationAction({ mutate: ['backgrounds'] })
  async fetchBackgrounds () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Background`)
    return {
      backgrounds: results.data
    }
  }
}
