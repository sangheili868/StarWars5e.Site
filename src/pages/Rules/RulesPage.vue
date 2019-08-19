<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import RoutesList from '@/components/RoutesList.vue'

  @Component({
    components: {
      RoutesList
    }
  })
  export default class Rules extends Vue {
    get categories () {
      return [
        {
          routes: [
            { to: '/rules/handbook', title: 'Player\'s Handbook' },
            { to: '/rules/monsters', title: 'Scum and Villainy' },
            { to: '/rules/starships', title: 'Starships of the Galaxy' },
            { to: '/rules/hives', title: 'Wretched Hives' }
          ]
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Rules
    RoutesList(:categories="categories")
</template>
