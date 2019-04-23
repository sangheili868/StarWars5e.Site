<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class ReferencePage extends Vue {
    get routes () {
      return [
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
          to: '/reference/armor',
          title: 'Armor'
        },
        {
          to: '/reference/weapons',
          title: 'Weapons'
        },
        {
          to: '/reference/gear',
          title: 'Gear'
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
        },
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
  }
</script>

<template lang="pug">
  div
    h1 Reference Data
    v-btn(v-for="{ to, title } in routes", :key="title", color="primary", :to="to") {{ title }}
</template>
