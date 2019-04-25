<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  interface categoryType {
    category: string
    routes: {
      to: string
      title: string
    }[]
  }

  @Component
  export default class RoutesList extends Vue {
    @Prop(Array) readonly categories!: categoryType[]
  }
</script>

<template lang="pug">
  div
    div(v-for="{category, routes} in categories", :key="category")
      h3.mt-3 {{ category }}
      v-container(grid-list-lg, fluid)
        v-layout(row, wrap, justify-center)
          v-flex(v-for="{ to, title } in routes", :key="title", d-flex).xs12.sm6.md3
            v-btn(color="primary", :to="to") {{ title }}
</template>
