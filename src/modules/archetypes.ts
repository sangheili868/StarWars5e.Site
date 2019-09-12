import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ArchetypeType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'archetype' })
export default class Archetypes extends VuexModule {
  archetypes: ArchetypeType[] = []

  @MutationAction({ mutate: ['archetypes'] })
  async fetchArchetypes () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Archetype`)
    return {
      archetypes: results.data
    }
  }
}
