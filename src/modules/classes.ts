import safeFetch from '@/utilities/safeFetch'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ClassType } from '@/types/characterTypes.ts'

@Module({ namespaced: true, name: 'classes' })
export default class Classes extends VuexModule {
  classes: ClassType[] = []

  @MutationAction({ mutate: ['classes'] })
  async fetchClasses () {
    const results = await safeFetch('api/Class')
    return {
      classes: results.data
    }
  }
}
