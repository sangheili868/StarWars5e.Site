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
          category: '',
          routes: [
            { to: '/loot/armor', title: 'Armor' },
            { to: '/loot/weapons', title: 'Weapons' },
            { to: '/loot/adventuringGear', title: 'Adventuring Gear' },
            { to: '/loot/enhancedItems', title: 'Enhanced Items' }
          ]
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Loot
    RoutesList(:categories="categories")
</template>
