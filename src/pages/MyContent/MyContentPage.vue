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
            { to: '/myContent/characterBuilder', title: 'Character Builder' },
            { to: '/myContent/characterEditor', title: 'Character Editor' },
            { to: '/myContent/characterSheet', title: 'Character Sheet' }
          ]
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 My Content
    RoutesList(:categories="categories")
</template>
