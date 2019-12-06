<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Loading from '@/components/Loading.vue'
  import { pickBy, every, merge } from 'lodash'

  interface HeaderType {
    text: string
    value: string
    align: string
    filterChoices: string[]
    filterFunction: (item: { [key: string]: string }, filterValue: string | string[]) => boolean
  }

  interface SessionType {
    $session: {
      get: (key: string) => { [tableName: string]: { [field: string]: string | string[] } },
      set: (key: string, value: { [tableName: string]: { [field: string]: string | string[] } }) => void
    }
  }

  @Component({
    components: {
      Loading
    }
  })
  export default class SearchTable extends Vue {
    @Prop(Array) readonly items!: { [key: string]: string }[]
    @Prop(Array) readonly headers!: HeaderType[]
    @Prop(Function) readonly customSort!: Function
    @Prop(String) readonly initialSearch: string | undefined
    @Prop(String) readonly tableType: string | undefined
    @Prop(String) readonly name!: string

    filterSelections: { [key: string]: any } = {}
    search: string | undefined = ''
    tabTitle: string | undefined = ''

    created () {
      const session = (this as unknown as SessionType).$session
      const tableQueries = session.get('sw5eTableQueries') || {}
      if (!tableQueries[this.name]) session.set('sw5eTableQueries', { ...tableQueries, [this.name]: {} })
      this.search = this.initialSearch || (this.storedQuery ? this.storedQuery.Search as string : '')
      this.filterSelections = this.storedQuery || {}
      this.tabTitle = this.tableType
    }

    get storedQuery () {
      return (this as unknown as SessionType).$session.get('sw5eTableQueries')[this.name]
    }

    get title () {
      const titleString = this.tabTitle + Vue.prototype.$titleSuffix
      return (this.search ? this.search + ' | ' + titleString : titleString)
    }

    get alignedHeaders () {
      return this.headers.map(header => ({
        render: (value: string) => value,
        ...header,
        align: 'center'
      }))
    }

    get validFilterSelections () {
      return pickBy(this.filterSelections, (filterSelection: any) =>
        Array.isArray(filterSelection) ? filterSelection.length > 0 : filterSelection
      )
    }

    get filteredItems () {
      return this.items.filter(item => every(this.validFilterSelections, (selection, filterField) => {
        const filterHeader = this.headers.find(({ text }) => text === filterField)
        return filterHeader ? filterHeader.filterFunction(item, selection) : true
      }))
    }

    get headersWithFilters () {
      return this.headers.filter(({ filterFunction }) => filterFunction)
    }

    handleFilterChange (field: string, input: string | string[]) {
      const session = (this as unknown as SessionType).$session
      const tableQueries = session.get('sw5eTableQueries')
      session.set('sw5eTableQueries', merge(tableQueries, { [this.name]: { [field]: input } }))
    }
  }
</script>

<template lang="pug">
  div(v-if="filteredItems")
    vue-headful(:title="title")
    v-card
      v-card-title
        v-text-field(
          v-model="search",
          append-icon="fa-search",
          label="Search",
          single-line,
          hide-details,
          @input="newValue => handleFilterChange('Search', newValue)"
        ).ma-2
        v-select(
          v-for="header in headersWithFilters",
          :key="header.text",
          :items="header.filterChoices",
          :label="header.text",
          v-model="filterSelections[header.text]",
          clearable,
          single-line,
          hide-details,
          :multiple="header.isMultiSelect"
          @input="newValue => handleFilterChange(header.text, newValue)"
        ).ma-2
      v-data-table(
        :headers="alignedHeaders",
        :items="filteredItems",
        v-bind="{ search }",
        :items-per-page="25",
        :custom-sort="customSort",
        :sort-by="storedQuery && storedQuery.sortBy",
        :sort-desc="storedQuery && storedQuery.sortDesc",
        :footer-props="{ 'items-per-page-options': [10, 25, 50, -1] }",
        @update:sort-by="newValue => handleFilterChange('sortBy', newValue)",
        @update:sort-desc="newValue => handleFilterChange('sortDesc', newValue)",
      )
        template(v-slot:item="{ isExpanded, item, expand }")
          tr(v-if="item.isExpandable", :class="$style.clickableRow", @click="expand(!isExpanded)")
            td(v-for="{ value, render } in alignedHeaders", :to="item.to") {{ render(item[value], item) }}
          router-link(v-else-if="item.to", tag="tr", :class="$style.clickableRow", :to="item.to")
            td(v-for="{ value, render } in alignedHeaders", :to="item.to") {{ render(item[value], item) }}
          tr(v-else)
            td(v-for="{ value, render } in alignedHeaders", :to="item.to") {{ render(item[value], item) }}
        template(v-slot:expanded-item="{ item, headers }")
          td(:colspan="headers.length").pt-3
            slot(:item="item")
  Loading(v-else)
</template>

<style module lang="scss">
  .clickableRow {
    cursor: pointer;
  }
</style>
