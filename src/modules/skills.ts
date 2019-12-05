import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { SkillType } from '@/types/lookupTypes'

@Module({ namespaced: true, name: 'skills' })
export default class Skills extends VuexModule {
  skills: SkillType[] = []

  @MutationAction({ mutate: ['skills'] })
  async fetchSkills () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Skills`)
    return {
      skills: results.data
    }
  }
}
