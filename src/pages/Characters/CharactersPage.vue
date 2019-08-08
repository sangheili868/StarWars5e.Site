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
          category: '',
          routes: [
            { to: '/characters/species', title: 'Species' },
            { to: '/characters/classes', title: 'Classes' },
            { to: '/characters/archetypes', title: 'Archetypes' },
            { to: '/characters/backgrounds', title: 'Backgrounds' },
            { to: '/characters/feats', title: 'Feats' },
            { to: '/characters/forcePowers', title: 'Force Powers' },
            { to: '/characters/techPowers', title: 'Tech Powers' },
            { to: '/characters/additionalVariantRules', title: 'Additional Variant Rules' }
          ]
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Character Data
    RoutesList(:categories="categories")
</template>
