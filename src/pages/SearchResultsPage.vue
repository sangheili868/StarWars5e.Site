<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Loading from '@/components/Loading.vue'
  import { SearchResultType } from '@/types/utilityTypes'
  import _ from 'lodash'
  import pluralize from 'pluralize'
  import SearchBox from '@/components/SearchBox.vue'

  const searchResultsModule = namespace('searchResults')

  @Component({
    components: {
      SearchBox,
      Loading
    }
  })
  export default class SearchResultsPage extends Vue {
    @searchResultsModule.State searchResults!: SearchResultType[]
    @searchResultsModule.Action fetchSearchResults!: (searchText: string) => Promise<SearchResultType[]>
    @Prop(String) readonly searchText!: string
    selectedSearchTypes: number[] = []

    isSearching = false

    get title () {
      let titleString = 'Search Results' + Vue.prototype.$titleSuffix
      if (this.searchText) {
        return this.searchText + ' | ' + titleString
      }
      return titleString
    }

    created () {
      this.fetchResults()
    }

    @Watch('$route')
    fetchData () {
      this.fetchResults()
    }

    fetchResults () {
      if (this.searchText) {
        this.isSearching = true
        this.fetchSearchResults(this.searchText).then(() => { this.isSearching = false })
      }
    }

    get resultCount () {
      return pluralize('result', this.filteredSearch.length, true)
    }

    get searchTypes () {
      var result = _.uniq(_.map(this.searchResults, 'globalSearchTermType'))
      this.selectedSearchTypes = [ ...Array(result.length).keys() ]
      return result
    }

    get filteredSearch () {
      var searchTypeStrings = this.selectedSearchTypes.map(i => _.uniq(_.map(this.searchResults, 'globalSearchTermType'))[i])
      var x = this.searchResults.filter(s => searchTypeStrings.includes(s.globalSearchTermType))
      return x
    }
  }
</script>

<template lang="pug">
  div
    vue-headful(:title="title")
    h1.pb-3 Search
    SearchBox(isClearable).pb-3
    template(v-if="searchText && !isSearching")
      h5.pb-3 {{ resultCount }} for {{ searchText }}
      v-chip-group(column, multiple, v-model="selectedSearchTypes")
        v-chip(v-for="searchType in searchTypes", :key="searchType", filter) {{ searchType }}
      v-list(v-if="filteredSearch.length")
        v-list-item(v-for="{ fullName, path, rowKey } in filteredSearch", :key="rowKey", :to="path") {{ fullName }}
    Loading(v-else-if="isSearching")
</template>
