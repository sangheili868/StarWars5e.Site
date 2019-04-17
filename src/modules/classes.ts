import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { CharacterClass } from '@/types.ts'

@Module({ namespaced: true, name: 'classes' })
export default class Classes extends VuexModule {
  classes: CharacterClass[] = []

  @MutationAction({ mutate: ['classes'] })
  async fetchClasses () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Class`)
    return {
      classes: results.data
    }
  }
}
