import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ClassType } from '@/types/characterTypes.ts'

@Module({ namespaced: true, name: 'classes' })
export default class Classes extends VuexModule {
  classes: ClassType[] = []

  @MutationAction({ mutate: ['classes'] })
  async fetchClasses () {
    return {
      classes: await fetchFromCache((this as any).state.classes, 'Class')
    }
  }
}
