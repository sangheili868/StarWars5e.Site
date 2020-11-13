<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import RoutesList from '@/components/RoutesList.vue'

  @Component({
    components: {
      RoutesList
    }
  })
  export default class ToolsPage extends Vue {
    get categories () {
      return [
        {
          category: '',
          routes: [
            { to: '/tools/characters', title: 'Character Creator' }
          ]
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Tools
    RoutesList(:categories="categories")
    div More Coming Soon!
</template>
