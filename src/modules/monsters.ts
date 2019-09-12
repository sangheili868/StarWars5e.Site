import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { MonsterType } from '@/types/referenceTypes'

@Module({ namespaced: true, name: 'monster' })
export default class Monsters extends VuexModule {
  monsters: MonsterType[] = []

  @MutationAction({ mutate: ['monsters'] })
  async fetchMonsters () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Monster`)
    return {
      monsters: results.data
    }
  }
}
