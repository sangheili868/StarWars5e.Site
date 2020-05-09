import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { PowerType } from '@/types/characterTypes.ts'

@Module({ namespaced: true, name: 'power' })
export default class Power extends VuexModule {
  powers: PowerType[] = []

  @MutationAction({ mutate: ['powers'] })
  async fetchPowers () {
    return {
      powers: await fetchFromCache((this as any).state.powers, 'Powers')
    }
  }
}
