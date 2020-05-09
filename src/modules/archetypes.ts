import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ArchetypeType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'archetype' })
export default class Archetypes extends VuexModule {
  archetypes: ArchetypeType[] = []

  @MutationAction({ mutate: ['archetypes'] })
  async fetchArchetypes () {
    return {
      archetypes: await fetchFromCache((this as any).state.archetypes, 'Archetype')
    }
  }
}
