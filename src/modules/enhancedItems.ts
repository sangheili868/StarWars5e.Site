import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { EnhancedItemType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'enhancedItems' })
export default class EnhancedItems extends VuexModule {
  enhancedItems: EnhancedItemType[] = []

  @MutationAction({ mutate: ['enhancedItems'] })
  async fetchEnhancedItems () {
    return {
      enhancedItems: await fetchFromCache((this as any).state.enhancedItems, 'EnhancedItem')
    }
  }
}
