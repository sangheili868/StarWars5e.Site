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

    pagination = { rowsPerPage: 25 }
    filterSelections: { [key: string]: any } = {}
    search: string | undefined = ''

    created () {
      this.search = this.initialSearch
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
    v-data-table(:headers="alignedHeaders", :items="filteredItems", v-bind="{ search }", :pagination.sync="pagination", :custom-sort="customSort")
      template(v-slot:items="props")
        tr(v-if="props.item.isExpandable", :class="$style.clickableRow", @click="props.expanded = !props.expanded")
          td(v-for="{ value, render } in alignedHeaders", :to="props.item.to") {{ render(props.item[value], props.item) }}
        router-link(v-else-if="props.item.to", tag="tr", :class="$style.clickableRow", :to="props.item.to")
          td(v-for="{ value, render } in alignedHeaders", :to="props.item.to") {{ render(props.item[value], props.item) }}
        tr(v-else)
          td(v-for="{ value, render } in alignedHeaders", :to="props.item.to") {{ render(props.item[value], props.item) }}
      template(v-slot:expand="props")
        v-card(flat)
          v-card-text
            slot(:item="props.item")
  Loading(v-else)
</template>

<style module lang="scss">
  .clickableRow {
    cursor: pointer;
  }
</style>
