import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { GlobalSearchResult } from '@/types'

@Module({ namespaced: true, name: 'search' })
export default class Search extends VuexModule {
  searchResults: GlobalSearchResult[] = []

  @MutationAction({ mutate: ['searchResults'] })
  async fetchSearchResults (searchText: string) {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/Search?searchText=${searchText}`)
    return {
      searchResults: results.data
    }
  }
}
