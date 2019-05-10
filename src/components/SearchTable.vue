<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Loading from '@/components/Loading.vue'
  import _ from 'lodash'

  interface HeaderType {
    text: string
    value: string
    align: string
    isFilterable: boolean
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
    @Prop(Boolean) readonly isExpandable!: boolean

    pagination = { rowsPerPage: 25 }
    search = ''
    filterSelections: { [key: string]: any } = {}

    get alignedHeaders () {
      return this.headers.map(header => ({
        render: (value: string) => value,
        ...header,
        align: 'center'
      }))
    }

    get filterOne () {
      return this.headers.filter(h => h.isFilterable)[0]
    }

    get filterTwo () {
      return this.headers.filter(h => h.isFilterable)[1]
    }

    get filterThree () {
      return this.headers.filter(h => h.isFilterable)[2]
    }

    get filteredItems () {
      let fItems = this.items
      if (this.filterOne && this.filter[this.filterOne.value]) {
        fItems = fItems.filter((i: any) => this.filter[this.filterOne.value] && this.filterOne.filterFunction(i, this.filter[this.filterOne.value]))
      }
      if (this.filterTwo && this.filter[this.filterTwo.value]) {
        fItems = fItems.filter((i: any) => this.filter[this.filterTwo.value] && this.filterTwo.filterFunction(i, this.filter[this.filterTwo.value]))
      }
      if (this.filterThree && this.filter[this.filterThree.value]) {
        fItems = fItems.filter((i: any) => this.filter[this.filterThree.value] && this.filterThree.filterFunction(i, this.filter[this.filterThree.value]))
      }
      return fItems
    }
  }
</script>

<template lang="pug">
  div(v-if="filteredItems")
    v-card
      v-card-title
        v-text-field(v-model="search", append-icon="fa-search", label="Search", single-line, hide-details)
        v-select(v-if="filterOne", :items="filterOne.filterChoices", :label="filterOne.text", v-model="filter[filterOne.value]", clearable, single-line, hide-details, :multiple="filterOne.isMultiSelect")
        v-select(v-if="filterTwo", :items="filterTwo.filterChoices", :label="filterTwo.text", v-model="filter[filterTwo.value]", clearable, single-line, hide-details, :multiple="filterTwo.isMultiSelect")
        v-select(v-if="filterThree", :items="filterThree.filterChoices", :label="filterThree.text", v-model="filter[filterThree.value]", clearable, single-line, hide-details, :multiple="filterThree.isMultiSelect")
        v-spacer(v-if="!filterOne")
        v-spacer(v-if="!filterTwo")
        v-spacer(v-if="!filterThree")
    v-data-table(:headers="alignedHeaders", :items="filteredItems" v-bind="{ search }", :pagination.sync="pagination")
      template(v-slot:items="props")
        tr(v-if="isExpandable", :class="$style.row", @click="props.expanded = !props.expanded")
          td(v-for="{ value, render } in alignedHeaders", :to="props.item.to") {{ render(props.item[value], props.item) }}
        router-link(tag="tr", v-else, :class="$style.row", :to="props.item.to")
          td(v-for="{ value, render } in alignedHeaders", :to="props.item.to") {{ render(props.item[value], props.item) }}
      template(v-slot:expand="props")
        v-card(flat)
          v-card-text
            slot(:item="props.item")
  Loading(v-else)
</template>

<style module lang="scss">
  .row {
    cursor: pointer;
  }
</style>
