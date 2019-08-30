<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'

  @Component({
    components: {
      NavigationDrawer
    }
  })
  export default class HivesNavigation extends Vue {
    items = [
      {
        title: 'Step-By-Step Factions',
        icon: 'fa-beer',
        route: '/rules/hives'
      },
      {
        title: 'Entertainment and Downtime',
        icon: 'fa-pencil-ruler',
        route: '/rules/hives/downtime'
      },
      {
        title: 'Factions and Membership',
        icon: 'fa-globe',
        route: '/rules/hives/factionsAndMembership'
      },
      {
        title: 'Using Ability Scores',
        icon: 'fa-dice-d20',
        route: '/rules/hives/abilityScores'
      },
      {
        title: 'Enhanced Items',
        icon: 'fa-hat-wizard',
        route: '/rules/hives/enhancedItems'
      },
      {
        title: 'Modifiable Items',
        icon: 'fa-tools',
        route: '/rules/hives/modifiableItems'
      },
      {
        title: 'Cybernetic Augmentations',
        icon: 'fa-car-battery',
        route: '/rules/hives/cyberneticAugmentations'
      },
      {
        title: 'Droid Customizations',
        icon: 'fa-robot',
        route: '/rules/hives/droidCustomizations'
      },
      {
        title: 'Tool Proficiencies',
        icon: 'fa-mortar-pestle',
        route: '/rules/hives/toolProficiencies'
      },
      {
        title: 'More coming soon...',
        icon: 'fa-toolbox'
      }
    ]
  }
</script>

<template lang="pug">
  NavigationDrawer(:items="items", baseRoute="/rules/hives")
</template>
