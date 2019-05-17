<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import RoutesList from '@/components/RoutesList.vue'

  @Component({
    components: {
      RoutesList
    }
  })
  export default class ReferencePage extends Vue {
    get categories () {
      return [
        {
          category: 'Characters',
          routes: [
            {
              to: '/reference/species',
              title: 'Species'
            },
            {
              to: '/reference/archetypes',
              title: 'Archetypes'
            },
            {
              to: '/reference/backgrounds',
              title: 'Backgrounds'
            },
            {
              to: '/reference/feats',
              title: 'Feats'
            },
            {
              to: '/reference/forcePowers',
              title: 'Force Powers'
            },
            {
              to: '/reference/techPowers',
              title: 'Tech Powers'
            }
          ]
        },
        {
          category: 'Equipment',
          routes: [
            {
              to: '/reference/armor',
              title: 'Armor'
            },
            {
              to: '/reference/weapons',
              title: 'Weapons'
            },
            {
              to: '/reference/adventuringGear',
              title: 'Adventuring Gear'
            }
          ]
        },
        {
          category: 'Dungeon Master',
          routes: [
            {
              to: '/reference/monsters',
              title: 'Monsters'
            }
          ]
        },
        {
          category: 'Starships',
          routes: [
            {
              to: '/reference/starshipEquipment',
              title: 'Starship Equipment'
            },
            {
              to: '/reference/starshipModifications',
              title: 'Starship Modifications'
            },
            {
              to: '/reference/starshipWeapons',
              title: 'Starship Weapons'
            },
            {
              to: '/reference/ventures',
              title: 'Ventures'
            }
          ]
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Reference Data
    RoutesList(:categories="categories")
</template>
