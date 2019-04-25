<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { State, Action } from 'vuex-class'
  import RoutesList from '@/components/RoutesList.vue'

  @Component({
    components: {
      RoutesList
    }
  })
  export default class HomePage extends Vue {
    get categories () {
      return [
        {
          category: 'Handbook',
          routes: [
            {
              title: 'Introduction',
              to: '/handbook'
            },
            {
              title: 'Species',
              to: '/handbook/species'
            },
            {
              title: 'Classes',
              to: '/handbook/classes'
            },
            {
              title: 'Combat',
              to: '/handbook/combat'
            }
          ]
        },
        {
          category: 'Starships',
          routes: [
            {
              title: 'Introduction',
              to: '/starships'
            },
            {
              title: 'Deployments',
              to: '/starships/deployments'
            },
            {
              title: 'Ships',
              to: '/starships/starshipSizes'
            },
            {
              title: 'Combat',
              to: '/starships/combat'
            }
          ]
        },
        {
          category: 'Reference',
          routes: [
            {
              to: '/reference/weapons',
              title: 'Weapons'
            },
            {
              to: '/reference/forcePowers',
              title: 'Force Powers'
            },
            {
              to: '/reference/techPowers',
              title: 'Tech Powers'
            },
            {
              to: '/reference/monsters',
              title: 'Monsters'
            }
          ]
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Star Wars 5e
    RoutesList(:categories="categories")
</template>
