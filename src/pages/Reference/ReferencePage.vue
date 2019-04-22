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
          to: '/reference/equipment',
          title: 'Equipment'
        },
        {
          to: '/reference/monsters',
          title: 'Monsters'
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
    }
  }
</script>

<template lang="pug">
  div
    h1 Reference Data
    v-btn(v-for="{ to, title } in routes", :key="title", color="primary", :to="to") {{ title }}
</template>
