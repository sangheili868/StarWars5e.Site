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
        title: 'Introduction',
        icon: 'fa-journal-whills',
        route: '/rules/hives'
      },
      {
        title: 'Step-By-Step Factions',
        icon: 'fa-beer',
        route: '/rules/hives/stepByStepFactions'
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
        title: 'Equipment',
        icon: 'fa-shopping-bag',
        route: '/rules/hives/equipment'
      },
      {
        title: 'Customization Options',
        icon: 'fa-tools',
        route: '/rules/hives/customizationOptions'
      },
      {
        title: 'Enhanced Items',
        icon: 'fa-hat-wizard',
        route: '/rules/hives/enhancedItems'
      },
      {
        title: 'Tool Proficiencies',
        icon: 'fa-mortar-pestle',
        route: '/rules/hives/toolProficiencies'
      },
      {
        title: 'Changelog',
        icon: 'fa-list',
        route: '/rules/hives/changelog'
      }
    ]
  }
</script>

<template lang="pug">
  NavigationDrawer(:items="items", baseRoute="/rules/hives")
</template>
