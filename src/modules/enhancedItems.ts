import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { EnhancedItemType } from '@/types/lootTypes.ts'

@Module({ namespaced: true, name: 'enhancedItems' })
export default class EnhancedItems extends VuexModule {
  enhancedItems: EnhancedItemType[] = []

  @MutationAction({ mutate: ['enhancedItems'] })
  async fetchEnhancedItems () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/EnhancedItem`)
    return {
      enhancedItems: results.data
    }
  }
}
