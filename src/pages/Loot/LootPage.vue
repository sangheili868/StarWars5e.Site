<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import RoutesList from '@/components/RoutesList.vue'

  @Component({
    components: {
      RoutesList
    }
  })
  export default class LootPage extends Vue {
    get categories () {
      return [
        {
          category: 'Loot',
          routes: [
            { to: '/loot/armor', title: 'Armor' },
            { to: '/loot/weapons', title: 'Weapons' },
            { to: '/loot/adventuringGear', title: 'Adventuring Gear' },
            { to: '/loot/enhancedItems', title: 'Enhanced Items' }
          ]
        },
        {
          category: 'Generators',
          routes: [
            { to: '/loot/generator', title: 'Loot Generator' }
          ]
        }
      ]
    }
  }
</script>

<template lang="pug">
  RoutesList(:categories="categories")
</template>
