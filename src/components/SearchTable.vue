<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Loading from '@/components/Loading.vue'

  interface HeaderType {
    text: string
    value: string
    align: string
  }

  @Component({
    components: {
      Loading
    }
  })
  export default class SearchTable extends Vue {
    @Prop(Array) readonly items!: { [key: string]: string }
    @Prop(Array) readonly headers!: HeaderType[]
    @Prop(Boolean) readonly isExpandable!: boolean

    pagination = { rowsPerPage: 25 }
    search = ''

    get alignedHeaders () {
      return this.headers.map(header => ({
        render: (value: string) => value,
        ...header,
        align: 'center'
      }))
    }
  }
</script>

<template lang="pug">
  div
    v-card
      v-card-title
        v-spacer
        v-spacer
        v-spacer
        v-text-field(v-model="search", append-icon="fa-search", label="Search", single-line, hide-details)
    v-data-table(
      v-if=" items.length",
      :headers="alignedHeaders",
      v-bind="{ items, search }",
      :pagination.sync="pagination"
    )
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
