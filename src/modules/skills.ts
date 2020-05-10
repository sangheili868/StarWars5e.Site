import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { SkillType } from '@/types/lookupTypes'

@Module({ namespaced: true, name: 'skills' })
export default class Skills extends VuexModule {
  skills: SkillType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['skills', 'cachedVersion'] })
  async fetchSkills () {
    const { data: skills, cachedVersion } = await fetchFromCache(this, 'skills', 'skills')
    return { skills, cachedVersion }
  }
}
