import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { EnhancedItemType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'enhancedItems' })
export default class EnhancedItems extends VuexModule {
  enhancedItems: EnhancedItemType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['enhancedItems', 'cachedVersion'] })
  async fetchEnhancedItems () {
    const { data: enhancedItems, cachedVersion } = await fetchFromCache(this, 'enhancedItems', 'enhancedItem')
    return { enhancedItems, cachedVersion }
  }
}
