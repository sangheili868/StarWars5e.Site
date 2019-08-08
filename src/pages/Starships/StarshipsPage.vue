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
            { to: '/starships/deployments', title: 'Deployments' },
            { to: '/starships/ventures', title: 'Ventures' },
            { to: '/starships/modifications', title: 'Modifications' },
            { to: '/starships/equipment', title: 'Equipment' },
            { to: '/starships/weapons', title: 'Weapons' }
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
