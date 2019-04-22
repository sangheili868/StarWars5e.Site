<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  interface HeaderType {
    text: string
    value: string
    align: string
  }

  @Component
  export default class SearchTable extends Vue {
    @Prop(Array) readonly items!: { [key: string]: string }
    @Prop(Array) readonly headers!: HeaderType[]
    @Prop(Boolean) readonly isExpandable!: boolean

    pagination = { rowsPerPage: 25 }

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
  v-data-table(:headers="alignedHeaders", v-bind="{ items }", :pagination.sync="pagination")
    template(v-slot:items="props")
      tr(v-if="isExpandable", :class="$style.row", @click="props.expanded = !props.expanded")
        td(v-for="{ value, render } in alignedHeaders", :to="props.item.to") {{ render(props.item[value]) }}
      router-link(tag="tr", v-else, :class="$style.row", :to="props.item.to")
        td(v-for="{ value, render } in alignedHeaders", :to="props.item.to") {{ render(props.item[value]) }}
    template(v-slot:expand="props")
      v-card(flat)
        v-card-text
          slot(:item="props.item")
</template>

<style module lang="scss">
  .row {
    cursor: pointer;
  }
</style>
