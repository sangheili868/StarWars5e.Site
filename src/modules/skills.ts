import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { SkillType } from '@/types/lookupTypes'

@Module({ namespaced: true, name: 'skills' })
export default class Skills extends VuexModule {
  skills: SkillType[] = []

  @MutationAction({ mutate: ['skills'] })
  async fetchSkills () {
    return {
      skills: await fetchFromCache((this as any).state.skills, 'Skills')
    }
  }
}
