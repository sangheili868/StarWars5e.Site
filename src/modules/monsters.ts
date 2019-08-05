import axios from 'axios'
import Vue from 'vue'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { MonsterType, AuthType } from '@/types'

@Module({ namespaced: true, name: 'monster' })
export default class Monsters extends VuexModule {
  monsters: MonsterType[] = []

  @MutationAction({ mutate: ['monsters'] })
  async fetchMonsters () {
    const results = await Vue.prototype.$http.get(`${process.env.VUE_APP_sw5eapiurl}/api/Monster`, { withCredentials: true })
    return {
      monsters: results.data
    }
  }
}
