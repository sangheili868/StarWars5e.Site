<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Loading from '@/components/Loading.vue'
  import { SearchResultType } from '@/types/utilityTypes'
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
      return pluralize('result', this.searchResults.length, true)
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
      v-list(v-if="searchResults.length")
        v-list-item(v-for="{ fullName, path, rowKey } in searchResults", :key="rowKey", :to="path") {{ fullName }}
    Loading(v-else-if="isSearching")
</template>
