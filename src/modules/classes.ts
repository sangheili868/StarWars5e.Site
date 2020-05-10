import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ClassType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'classes' })
export default class Classes extends VuexModule {
  classes: ClassType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['classes', 'cachedVersion'] })
  async fetchClasses () {
    const { data: classes, cachedVersion } = await fetchFromCache(this, 'classes', 'class')
    return { classes, cachedVersion }
  }
}
