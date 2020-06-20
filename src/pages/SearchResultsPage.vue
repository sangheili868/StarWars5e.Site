<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Loading from '@/components/Loading.vue'
  import { SearchResultType } from '@/types/utilityTypes'
  import { chain, startCase } from 'lodash'
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
    selectedSearchTypes: string[] = []

    isSearching = false
    pluralize = pluralize
    startCase = startCase

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
        this.fetchSearchResults(this.searchText).then(() => {
          this.isSearching = false
          this.selectedSearchTypes = chain(this.searchResults)
            .map('globalSearchTermType')
            .uniq()
            .value()
        })
      }
    }

    get searchTypes () {
      return chain(this.searchResults).map(({ globalSearchTermType }) => ({
        value: globalSearchTermType,
        text: startCase(globalSearchTermType)
      })).uniq().value()
    }

    get filteredSearch () {
      return this.searchResults.filter(({ globalSearchTermType }) => this.selectedSearchTypes.includes(globalSearchTermType))
    }

    clearSelection () {
      this.selectedSearchTypes = []
    }
  }
</script>

<template lang="pug">
  div
    vue-headful(:title="title")
    h1.pb-3 Search
    SearchBox(isClearable).pb-3
    template(v-if="searchText && !isSearching")
      v-select(v-model="selectedSearchTypes", :items="searchTypes", label="Filter Results", multiple, outlined)
        template(v-slot:append)
          v-icon(@click="clearSelection") fa-times-circle
          v-icon.mx-2 fa-caret-down
        template(v-slot:selection="{ item, index }")
          div(v-if="index === 0") {{ pluralize('result type', selectedSearchTypes.length, true ) }} selected
      h5.pb-3 {{ pluralize('result', this.filteredSearch.length, true) }} for {{ searchText }}
      v-list(v-if="filteredSearch.length")
        v-list-item(v-for="{ fullName, path, rowKey } in filteredSearch", :key="rowKey", :to="path") {{ fullName }}
    Loading(v-else-if="isSearching")
</template>
