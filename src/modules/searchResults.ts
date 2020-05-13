import axios from 'axios'
import _ from 'lodash'
import { SearchResultType } from '@/types/utilityTypes'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'searchResults' })
export default class SearchResults extends VuexModule {
  searchResults: SearchResultType[] = []

  @MutationAction({ mutate: ['searchResults'] })
  async fetchSearchResults (searchText: string) {
    searchText = `${searchText}*`
    let results
    try {
      results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/search`, { params: { searchText } })
      await (this as any).dispatch('dataVersions/setInternet', null, { root: true })
    } catch (e) {
      console.error('Failed to get search results')
      await (this as any).dispatch('dataVersions/setNoInternet', null, { root: true })
      throw e
    }
    return { searchResults: results.data }
  }
}
