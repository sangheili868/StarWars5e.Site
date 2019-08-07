<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import RoutesList from '@/components/RoutesList.vue'

  @Component({
    components: {
      RoutesList
    }
  })
  export default class CharactersPage extends Vue {
    get categories () {
      return [
        {
          category: 'Characters',
          routes: [
            {
              to: '/characters/species',
              title: 'Species'
            },
            {
              to: '/characters/archetypes',
              title: 'Archetypes'
            },
            {
              to: '/characters/backgrounds',
              title: 'Backgrounds'
            },
            {
              to: '/characters/feats',
              title: 'Feats'
            },
            {
              to: '/characters/forcePowers',
              title: 'Force Powers'
            },
            {
              to: '/characters/techPowers',
              title: 'Tech Powers'
            }
          ]
        },
        {
          category: 'Equipment',
          routes: [
            {
              to: '/characters/armor',
              title: 'Armor'
            },
            {
              to: '/characters/weapons',
              title: 'Weapons'
            },
            {
              to: '/characters/adventuringGear',
              title: 'Adventuring Gear'
            }
          ]
        },
        {
          category: 'Dungeon Master',
          routes: [
            {
              to: '/characters/additionalVariantRules',
              title: 'Additional Variant Rules'
            }
          ]
        },
        {
          category: 'Starships',
          routes: [
            {
              to: '/characters/starshipModifications',
              title: 'Starship Modifications'
            },
            {
              to: '/characters/starshipEquipment',
              title: 'Starship Equipment'
            },
            {
              to: '/characters/starshipWeapons',
              title: 'Starship Weapons'
            },
            {
              to: '/characters/ventures',
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
    h1 Characters Data
    RoutesList(:categories="categories")
</template>
