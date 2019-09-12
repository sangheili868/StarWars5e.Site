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
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/search`, { params: { searchText } })
    return { searchResults: results.data }
  }
}
