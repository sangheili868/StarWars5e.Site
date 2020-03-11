import safeFetch from '@/utilities/safeFetch'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ArchetypeType } from '@/types/characterTypes'
import safeFetch from '@/utilities/safeFetch'

@Module({ namespaced: true, name: 'archetype' })
export default class Archetypes extends VuexModule {
  archetypes: ArchetypeType[] = []

  @MutationAction({ mutate: ['archetypes'] })
  async fetchArchetypes () {
    const results = await safeFetch('api/Archetype')
    return {
      archetypes: results.data
    }
  }
}
