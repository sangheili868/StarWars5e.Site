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
            { to: '/rules/phb', title: 'Player\'s Handbook' },
            { to: '/rules/snv', title: 'Scum and Villainy' },
            { to: '/rules/sotg', title: 'Starships of the Galaxy' },
            { to: '/rules/wh', title: 'Wretched Hives' },
            { to: '/rules/variantRules', title: 'Variant Rules' },
            { to: '/rules/expandedContent', title: 'Expanded Content' }
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
