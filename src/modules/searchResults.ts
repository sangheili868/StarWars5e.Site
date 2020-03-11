import safeFetch from '@/utilities/safeFetch'
import _ from 'lodash'
import { SearchResultType } from '@/types/utilityTypes'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'searchResults' })
export default class SearchResults extends VuexModule {
  searchResults: SearchResultType[] = []

  @MutationAction({ mutate: ['searchResults'] })
  async fetchSearchResults (searchText: string) {
    searchText = `${searchText}*`
    const results = await safeFetch('api/search', { params: { searchText } })
    return { searchResults: results.data }
  }
}
