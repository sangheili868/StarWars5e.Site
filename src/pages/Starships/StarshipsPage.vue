<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import RoutesList from '@/components/RoutesList.vue'

  @Component({
    components: {
      RoutesList
    }
  })
  export default class StarshipsPage extends Vue {
    get categories () {
      return [
        {
          category: '',
          routes: [
            { to: '/starships/armor', title: 'Armor' },
            { to: '/starships/weapons', title: 'Weapons' },
            { to: '/starships/adventuringGear', title: 'Adventuring Gear' },
            { to: '/starships/enhancedItems', title: 'Enhanced Items' }
          ]
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Starships
    RoutesList(:categories="categories")
</template>
