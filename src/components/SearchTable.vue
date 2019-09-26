<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Loading from '@/components/Loading.vue'
  import _ from 'lodash'

  interface HeaderType {
    text: string
    value: string
    align: string
    filterChoices: string[]
    filterFunction: (item: { [key: string]: string }, filterValue: string | string[]) => boolean
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
    @Prop(String) initialSearch: string | undefined
    @Prop(String) tableType: string | undefined

    filterSelections: { [key: string]: any } = {}
    search: string | undefined = ''
    tabTitle: string | undefined = ''

    created () {
      this.search = this.initialSearch
      this.tabTitle = this.tableType
    }

    get title () {
        let titleString = this.tabTitle + Vue.prototype.$titleSuffix
        if (this.search) {
          return this.search + ' | ' + titleString
        }
        return titleString
    }

    get alignedHeaders () {
      return this.headers.map(header => ({
        render: (value: string) => value,
        ...header,
        align: 'center'
      }))
    }

    get validFilterSelections () {
      return _.pickBy(this.filterSelections, (filterSelection: any) =>
        Array.isArray(filterSelection) ? filterSelection.length > 0 : filterSelection
      )
    }

    get filteredItems () {
      return this.items.filter(item => _.every(this.validFilterSelections, (selection, filterField) =>
        this.headers.find(({ text }) => text === filterField)!.filterFunction(item, selection)
      ))
    }

    get headersWithFilters () {
      return this.headers.filter(({ filterFunction }) => filterFunction)
    }
  }
</script>

<template lang="pug">
  div(v-if="filteredItems")
    vue-headful(:title="title")
    v-card
      v-card-title
        v-text-field(v-model="search", append-icon="fa-search", label="Search", single-line, hide-details).ma-2
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
        ).ma-2
      v-data-table(
        :headers="alignedHeaders",
        :items="filteredItems",
        v-bind="{ search }",
        :items-per-page="25",
        :custom-sort="customSort",
        :footer-props="{ 'items-per-page-options': [10, 25, 50, -1] }"
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
