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
      v-container(fluid)
        v-row(justify="center")
          v-col(v-for="{ to, title } in routes", :key="title", :cols="12", :sm="6", :md="3")
            v-btn(color="primary", :to="to", block) {{ title }}
</template>
