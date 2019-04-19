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

    pagination = { rowsPerPage: 25 }

    get alignedHeaders () {
      return this.headers.map(header => ({
        ...header,
        align: 'center'
      }))
    }
  }
</script>

<template lang="pug">
  v-data-table(:headers="alignedHeaders", v-bind="{ items }", :pagination.sync="pagination")
    template(v-slot:items="props")
      router-link(tag="tr", :to="props.item.to", :class="$style.row")
        td(v-for="{ value } in headers", :to="props.item.to") {{ props.item[value] }}
</template>

<style module lang="scss">
  .row {
    cursor: pointer;
  }
</style>
